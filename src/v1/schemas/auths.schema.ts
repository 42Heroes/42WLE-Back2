import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Users } from './users.schema';

export type RefreshTokenDocument = RefreshToken & mongoose.Document;

@Schema()
export class RefreshToken {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: Users;

  @Prop({ type: String, default: null })
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(RefreshToken);
