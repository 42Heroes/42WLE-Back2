import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}
  async validateUser(id: string, intraId: string): Promise<any> {
    const user = await this.usersService.findOne(+id);
    if (user?.intraId === intraId) {
      const { nickname, ...result } = user;
      return result;
    }
    return null;
  }
}
