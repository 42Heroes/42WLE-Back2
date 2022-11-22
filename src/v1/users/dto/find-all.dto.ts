import { IsString, IsArray, IsBoolean } from 'class-validator';

export class findAllDto {
  @IsString()
  id: string;

  @IsString()
  nickname: string;

  @IsString()
  imageUrl?: string;

  @IsArray()
  nativeLanguage: string[];

  @IsArray()
  learningLanguage: string[];

  @IsBoolean()
  likeYou: boolean;
}
