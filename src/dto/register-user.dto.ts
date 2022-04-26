import {IsString, IsNotEmpty, IsPhoneNumber, IsEmail} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class RegisterUserDto {
	@ApiProperty({example:'Иван',description:'Имя пользователя'})
	@IsNotEmpty()
	@IsString()
	firstName: string;

	@ApiProperty({example:'Иванов',description:'Фамилия пользователя'})
	@IsNotEmpty()
	@IsString()
	lastName: string;

	@ApiProperty({example:'example@mail.ru',description:'Email пользователя'})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({example:'хххххххххх',description:'Пароль пользователя'})
	@IsNotEmpty()
	@IsString()
	password: string;

}
