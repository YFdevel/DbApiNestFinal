import {IsNotEmpty, IsNumberString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
export class ParamIdDto {
  @ApiProperty({example:'1',description:'Уникальный идентификатор'})
  @IsNumberString()
  @IsNotEmpty()
  id!: number;
}
