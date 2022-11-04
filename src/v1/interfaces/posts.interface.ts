import { Types } from 'mongoose';

export interface Posts {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  likes: Types.ObjectId[];
  images: string[];
  content: string;
}
