import {IsNotEmpty, IsNumberString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class PostUserIdDto {
    @ApiProperty({example:'3',description:'Уникальный идентификатор поста'})
    @IsNumberString()
    @IsNotEmpty()
    postId: number;

    @ApiProperty({example:'2',description:'Уникальный идентификатор пользователя'})
    @IsNumberString()
    @IsNotEmpty()
    userId: number;
}
