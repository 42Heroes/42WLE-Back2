import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private userModel: Model<UsersDocument>,
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
      .populate('likeYou', {
        nickname: true,
      })
      .exec();
    if (!users) {
      throw new NotFoundException('Could not find users.');
    }

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
    return user;
  }

  async findMe(id: number) {
    const user = await this.userModel
      .findById(id, {
        _id: true,
        nickname: true,
        nativeLanguage: true,
        learningLanguage: true,
        githubId: true,
        intraId: true,
        country: true,
        introduction: true,
        hashtags: true,
        imageUrl: true,
        likeYou: true,
        savedPosts: true,
        isRegisterDone: true,
      })
      .exec();
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUsersDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async createUser(createUserDto: CreateUsersDto) {
    const newUser = new this.userModel(createUserDto);
    const result = await newUser.save();
    return result;
  }
}
