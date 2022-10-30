import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ChatRooms } from './chatRooms.schema';
import { Posts } from './posts.schema';

export type UsersDocument = Users & mongoose.Document;

@Schema()
export class Users {
  @Prop()
  nickname: string;

  @Prop({ default: null })
  imageUrl: string | null;

  @Prop([String])
  nativeLanguage: string[];

  @Prop([String])
  learningLanguage: string[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        autopopulate: true,
      },
    ],
  })
  likeYou: Users[];

  @Prop()
  intraId: string;

  @Prop()
  githubId: string;

  @Prop()
  country: string;

  @Prop()
  introduction: string;

  @Prop([String])
  hashtags: string[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        autopopulate: true,
      },
    ],
  })
  likedUsers: Users[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
        autopopulate: true,
      },
    ],
  })
  savedPosts: Posts[];

  @Prop()
  isRegisterDone: boolean;

  @Prop()
  campus: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatRooms',
    autopopulate: true,
  }) // TODO: chatRoom 스키마 생성 후 변경
  chatRooms: ChatRooms[];

  @Prop()
  joinDate: Date;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
