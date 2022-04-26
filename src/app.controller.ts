import { Controller, Get} from '@nestjs/common';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {PostEntity} from "./database/entities/post.entity";


@Controller()
export class AppController {

    @ApiOperation({summary: 'Say Hello'})
    @ApiResponse({status: 200})
    @Get()
   getHello():string {
        return "Hello";
    }
}

