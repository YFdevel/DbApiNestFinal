import { IsString, IsNotEmpty } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class DeleteRoleDto {
    @ApiProperty({example:'user',description:'Значение роли'})
    @IsNotEmpty()
    @IsString()
    value: string;
}
