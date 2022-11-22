import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Posts } from './posts.schema';
import { Users } from './users.schema';

export type CommentsDocument = Comments & mongoose.Document;

@Schema()
export class Comments {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts',
  })
  postId: Posts;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments',
  })
  parentId: Comments;

  @Prop({ required: true })
  depth: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  })
  userId: Users;

  @Prop()
  content: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
  })
  likes: Users[];

  @Prop({ default: false })
  isDeleted: boolean;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
