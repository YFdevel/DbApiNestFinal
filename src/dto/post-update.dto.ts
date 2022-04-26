import {
    IsInt,
    IsNotEmpty,
    IsString,
} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";


export class PostUpdateDto {
    @ApiProperty({example:'Пост №1',description:'Название поста'})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({example:'Содержание',description:'Содержание поста'})
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({example:'2',description:'Уникальный идентификатор пользователя'})
    @IsNotEmpty()
    @IsInt()
    userId:number;

}
