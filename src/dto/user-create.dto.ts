import {IsNotEmpty, IsString, IsEmail, IsInt, IsOptional, IsArray, IsEnum} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
export class UserCreateDto {
    @ApiProperty({example:'1',description:'Уникальный идентификатор'})
    @IsInt()
    @IsOptional()
    id:number;

    @ApiProperty({example:'Иван',description:'Имя пользователя'})
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty({example:'Иванов',description:'Фамилия пользователя'})
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty({example:'xxxx.jpeg',description:'Аватарка пользователя'})
    @IsOptional()
    @IsString()
    avatar:string;

    @ApiProperty({example:'example@mail.ru',description:'Email пользователя'})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({example:'хххххххххх',description:'Пароль пользователя'})
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({example:'Bearer ryuwyeriuybxvcvb',description:'Уникальный токен'})
    @IsString()
    @IsOptional()
    tokenForm: string;

}
