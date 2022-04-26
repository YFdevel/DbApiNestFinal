import {IsString, IsEmail, IsOptional, IsNumberString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UserUpdateDto {
    @ApiProperty({example:'1',description:'Уникальный идентификатор'})
    @IsNumberString()
    @IsOptional()
    id:number;

    @ApiProperty({example:'Иван',description:'Имя пользователя'})
    @IsString()
    @IsOptional()
    firstName: string;

    @ApiProperty({example:'Иванов',description:'Фамилия пользователя'})
    @IsOptional()
    @IsString()
    lastName: string;

    @ApiProperty({example:'example@mail.ru',description:'Email пользователя'})
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty({example:'хххххххххх',description:'Пароль пользователя'})
    @IsOptional()
    @IsString()
    password: string;

    @ApiProperty({example:'Bearer ryuwyeriuybxvcvb',description:'Уникальный токен'})
    @IsString()
    @IsOptional()
    tokenForm: string;

}
