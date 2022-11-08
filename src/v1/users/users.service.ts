import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    const users: Users[] = await this.usersModel.find();
    return users;
  }

  async findById(id: string): Promise<Users> {
    const user: Users = await this.usersModel.findById(id);
    return user;
  }

  isLikedUser(loggedIn: Users, target: Users): boolean {
    // TODO: 로그인 안 되었을 경우 처리
    const found: Users = loggedIn.likeYou.find(user => {
      return JSON.stringify(user._id) === JSON.stringify(target._id);
    });
    return found ? true : false;
  }
}
