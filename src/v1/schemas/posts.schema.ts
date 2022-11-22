import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Users } from './users.schema';

export type PostsDocument = Posts & mongoose.Document;

@Schema()
export class Posts {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  })
  author: Users;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
  })
  likes: Users[];

  @Prop([String])
  images: string[];

  @Prop({ required: true })
  content: string;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
