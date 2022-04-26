import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthUserDto} from "../dto/auth-user.dto";
import {RegisterUserDto} from "../dto/register-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "../database/entities/user.entity";
import {TokenDto} from "../dto/token.dto";
import {UserCreateDto} from "../dto/user-create.dto";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @ApiOperation({summary: 'Авторизация пользователя'})
    @ApiResponse({status: 200, type: ()=>TokenDto})
    @Post('login')
    login(@Body() params: AuthUserDto) {
        return this.authService.login(params);
    }

    @ApiOperation({summary: 'Регистрация пользователя'})
    @ApiResponse({status: 200, type:()=>UserCreateDto})
    @Post('register')
    register(@Body() params: RegisterUserDto) {
        return this.authService.register(params);
    }

}
