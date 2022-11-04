import { Types } from 'mongoose';

export interface UsersList {
  _id: Types.ObjectId;
  nickname: string;
  imageUrl: string;
  nativeLanguage: string[];
  learningLanguage: string[];
  likeYou: boolean;
}
