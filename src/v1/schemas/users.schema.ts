import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ChatRooms } from './chatRooms.schema';
import { Posts } from './posts.schema';

export type UsersDocument = Users & mongoose.Document;

@Schema()
export class Users {
  @Prop({ required: true })
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
      },
    ],
  })
  likeYou: Users[];

  @Prop({ required: true })
  intraId: string;

  @Prop({ default: null })
  githubId: string | null;

  @Prop({ required: true })
  country: string;

  @Prop({ default: null })
  introduction: string | null;

  @Prop([String])
  hashtags: string[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
  })
  likedUsers: Users[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
      },
    ],
  })
  savedPosts: Posts[];

  @Prop({ default: false })
  isRegisterDone: boolean;

  @Prop({ required: true })
  campus: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatRooms',
  })
  chatRooms: ChatRooms[];

  @Prop({ default: null })
  joinDate: Date | null;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
