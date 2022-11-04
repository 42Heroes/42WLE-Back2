import { Types } from 'mongoose';
import { ChatRooms } from 'src/v1/interfaces/chatRooms.interface';
import { Posts } from 'src/v1/interfaces/posts.interface';

export interface Users {
  _id: Types.ObjectId;
  nickname: string;
  imageUrl: string | null;
  nativeLanguage: string[];
  learningLanguage: string[];
  likeYou: Users[];
  intraId: string;
  githubId: string | null;
  country: string;
  introduction: string | null;
  hashtags: string[];
  likedUsers: Users[];
  savedPosts: Posts[];
  isRegisterDone: boolean;
  campus: string;
  chatRooms: ChatRooms[];
  joinDate: Date | null;
}
