import { IsString, IsNotEmpty } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AuthUserDto {
	@ApiProperty({example:'example@mail.ru',description:'Email пользователя'})
	@IsNotEmpty()
	@IsString()
	email: string;

	@ApiProperty({example:'хххххххххх',description:'Пароль пользователя'})
	@IsNotEmpty()
	@IsString()
	password: string;
}
