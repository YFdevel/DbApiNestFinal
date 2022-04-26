import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty, IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { CommentCreateDto } from './comment-create.dto';
import {ApiProperty} from "@nestjs/swagger";

export class PostCreateDto {
  @ApiProperty({example:'1',description:'Уникальный идентификатор'})
  @IsInt()
  @IsPositive()
  @IsOptional()
  id: number;

  @ApiProperty({example:'Пост №1',description:'Название поста'})
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({example:'Содержание',description:'Содержание поста'})
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({example:'2022-04-24 10:36:29.292742',description:'Дата создания поста'})
  @IsDateString()
  @IsOptional()
  createdAt: Date;

  @ApiProperty({example:'2022-04-24 10:36:29.292742',description:'Дата обновления поста'})
  @IsDateString()
  @IsOptional()
  updatedAt: Date;

  @ApiProperty({example:'2',description:'Уникальный идентификатор пользователя'})
  @IsNotEmpty()
  @IsInt()
  userId:number;


  @IsOptional()
  @IsArray()
  comments: CommentCreateDto[];
}
