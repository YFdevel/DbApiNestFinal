import { IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class TokenDto {
	@ApiProperty({example:'Bearer ryuwyeriuybxvcvb',description:'Уникальный токен'})
	@IsString()
	accessToken!: string;
}
