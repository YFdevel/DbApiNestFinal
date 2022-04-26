import { IsString, IsNotEmpty } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({example:'user',description:'Значение роли'})
    @IsNotEmpty()
    @IsString()
    value: string;

    @ApiProperty({example:'Пользователь',description:'Описание роли'})
    @IsString()
    description?: string;
}
