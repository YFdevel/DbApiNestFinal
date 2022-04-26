import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {PostEntity} from "../database/entities/post.entity";

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @ApiOperation({summary: 'Отправка тестового email'})
    @ApiResponse({status: 200})
    @Get()
    async sendMessage() {
        return await this.mailService.sendLogMessage('yf_dev_test@mail.ru');
    }
}
