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
    autopopulate: true,
  })
  postId: Posts;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments',
    autopopulate: true,
  })
  parentId: Comments;

  @Prop({ required: true })
  depth: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    autopopulate: true,
  })
  userId: Users;

  @Prop()
  content: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        autopopulate: true,
      },
    ],
  })
  likes: Users[];

  @Prop({ default: false })
  isDeleted: boolean;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
