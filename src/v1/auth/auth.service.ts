import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersDocument } from '../schemas/users.schema';
import { Model } from 'mongoose';
import { RefreshToken, RefreshTokenDocument } from '../schemas/auths.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshTokenDocument>,
  ) {}
  async validateUser(id: string, intraId: string): Promise<any> {
    const user = await this.usersService.findOne(+id);
    if (user?.intraId === intraId) {
      const { nickname, ...result } = user;
      return result;
    }
    return null;
  }

  async getAccessToken(code: string) {
    const clientId = process.env.FORTYTWO_CLIENT_ID;
    const redirectUri = process.env.FORTYTWO_CALLBACK_URL;
    const url = `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=c${code}`;
    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
      });
    } catch (error) {
      throw new ConflictException(error, 'There is no response from 42 API');
    }
    if (response.status !== 200) {
      throw new ConflictException(
        response.statusText,
        'There is no response from 42 API',
      );
    }
    try {
      return await response.json();
    } catch (error) {
      throw new ConflictException(error, 'There is error in response');
    }
  }

  async getToken(payload: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('JWT_AT_SECRET'),
        expiresIn: 60 * 15,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('JWT_RT_SECRET'),
        expiresIn: 60 * 60 * 24 * 7,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  async fortyTwoLogin(fortyTwoDto) {
    const { login: intra_id } = fortyTwoDto;

    let user = await this.usersService.findOne(intra_id);

    if (!user) {
      user = await this.usersService.createUser(fortyTwoDto);
    }

    const payload = {
      intra_id: user.intraId,
      id: user.id,
    };

    const tokens = await this.getToken(payload);

    await this.updateRefreshToken(user, tokens.refreshToken);

    return { tokens };
  }

  async updateRefreshToken(user: UsersDocument, refreshToken: string) {
    const token = await this.refreshTokenModel.findOne({ user: user.id });

    if (!token) {
      const newToken = new this.refreshTokenModel({
        user: user.id,
        refreshToken,
      });
      await newToken.save();
    } else {
      token.refreshToken = refreshToken;
      await token.save();
    }
  }
}
