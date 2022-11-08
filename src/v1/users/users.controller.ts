import { Controller, Get, Param } from '@nestjs/common';
import { UsersList } from './interfaces/users-list.interface';
import { Users } from './interfaces/users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUserList(): Promise<UsersList[]> {
    // TODO: 로그인 구현 후 loggedIn 삭제
    const loggedIn: Users = await this.usersService.findById(
      '63649f3b9c9c9341fe0d182d',
    );
    const users: Users[] = await this.usersService.findAll();
    const result: UsersList[] = users.map(user => {
      return {
        _id: user._id,
        nickname: user.nickname,
        imageUrl: user.imageUrl,
        nativeLanguage: user.nativeLanguage,
        learningLanguage: user.learningLanguage,
        likeYou: this.usersService.isLikedUser(loggedIn, user),
      };
    });
    return result;
  }

  @Get(':id')
  async getUserDetail(@Param('id') id: string) {
    // TODO: 로그인 구현 후 loggedIn 삭제
    const loggedIn: Users = await this.usersService.findById(
      '63649f3b9c9c9341fe0d182d',
    );
    const user: Users = await this.usersService.findById(id);
    const isLiked: boolean = this.usersService.isLikedUser(loggedIn, user);
    return {
      _id: user._id,
      nickname: user.nickname,
      imageUrl: user.imageUrl,
      nativeLanguage: user.nativeLanguage,
      learningLanguage: user.learningLanguage,
      intraId: user.intraId,
      githubId: user.githubId,
      country: user.country,
      introduction: user.introduction,
      hashtags: user.hashtags,
      isLiked,
    };
  }
}
