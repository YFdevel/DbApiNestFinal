import {IsNotEmpty, IsNumberString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
export class PostCommentIdDto {
  @ApiProperty({example:'3',description:'Уникальный идентификатор поста'})
  @IsNumberString()
  @IsNotEmpty()
  postId: number;

  @ApiProperty({example:'3',description:'Уникальный идентификатор комментария'})
  @IsNumberString()
  @IsNotEmpty()
  commentId: number;
}
