import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ChatRooms } from './chatRooms.schema';
import { Users } from './users.schema';

export type MessagesDocument = Messages & mongoose.Document;

@Schema()
export class Messages {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatRooms',
  })
  chatRoomId: ChatRooms;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  })
  userId: Users;

  @Prop(String)
  type: 'image' | 'text';

  @Prop()
  content: string;
}

export const MessagesSchema = SchemaFactory.createForClass(Messages);
