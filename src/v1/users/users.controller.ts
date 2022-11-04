import { Controller, Get } from '@nestjs/common';
import { UsersList } from './interfaces/users-list.interface';
import { Users } from './interfaces/users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUserList(): Promise<UsersList[]> {
    const users: Users[] = await this.usersService.getUsers();
    const result: UsersList[] = users.map(user => {
      return {
        _id: user._id,
        nickname: user.nickname,
        imageUrl: user.imageUrl,
        nativeLanguage: user.nativeLanguage,
        learningLanguage: user.learningLanguage,
        // TODO: 로그인 구현되면 본인의 likeYou 확인 로직 추가
        likeYou: false,
      };
    });
    return result;
  }
}
