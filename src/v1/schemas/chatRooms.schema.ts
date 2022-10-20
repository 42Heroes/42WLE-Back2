import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Users } from './users.schema';

export type ChatRoomsDocument = ChatRooms & mongoose.Document;

@Schema()
export class ChatRooms {
  @Prop()
  roonName: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    autopopulate: true,
  })
  users: Users[];
}

export const ChatRoomsSchema = SchemaFactory.createForClass(ChatRooms);
