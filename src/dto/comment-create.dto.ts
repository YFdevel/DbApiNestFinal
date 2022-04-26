import {
  IsDateString,
  IsInt, IsNotEmpty, IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";


export class CommentCreateDto {
  @ApiProperty({example:'1',description:'Уникальный идентификатор'})
  @IsOptional()
  @IsPositive()
  @IsInt()
  id: number;

  @ApiProperty({example:'Комментарий № 1',description:'Текст комментария'})
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({example:'2022-04-24 10:36:29.292742',description:'Дата создания комментария'})
  @IsOptional()
  @IsDateString()
  createdAt: Date;

  @ApiProperty({example:'2',description:'Уникальный идентификатор пользователя - внешний ключ'})
  @IsNotEmpty()
  @IsNumberString()
  userId:number;

  @ApiProperty({example:'3',description:'Уникальный идентификатор поста - внешний ключ'})
  @IsNotEmpty()
  @IsNumberString()
  postId:number;
}
