import { Types } from 'mongoose';

export interface ChatRooms {
  _id: Types.ObjectId;
  roomName: string;
  users: Types.ObjectId[];
}
