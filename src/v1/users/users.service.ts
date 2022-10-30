import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../schemas/users.schema';
import { Model } from 'mongoose';
import { FindAllInterface } from './interfaces/find-all.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}
  create(createUserDto: CreateUsersDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const users = await this.userModel
      .find(
        {},
        {
          _id: true,
          nickname: true,
          imageUrl: true,
          nativeLanguage: true,
          learningLanguage: true,
          likeYou: true,
        },
      )
      .exec();

    return users;
  }

  async findOne(id: number) {
    const user = await this.userModel
      .findById(id, {
        _id: true,
        nickname: true,
        imageUrl: true,
        nativeLanguage: true,
        learningLanguage: true,
        intraId: true,
        githubId: true,
        country: true,
        introduction: true,
        hashtags: true,
        likeYou: true,
      })
      .exec();
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUsersDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
