import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Put,
    Query, Redirect,
    Render,
    Req, UploadedFile,
    UseGuards, UseInterceptors
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {UserEntity} from "../database/entities/user.entity";
import {ParamIdDto} from "../dto/param-id.dto";
import {UserCreateDto} from "../dto/user-create.dto";
import {AuthGuard} from "../auth/auth-guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles-guard";
import {AuthUserDto} from "../dto/auth-user.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {FileFilter, FileName} from "../utils/upload-img.utils";
import {Express} from "express";
import {CommentCreateDto} from "../dto/comment-create.dto";
import {UserUpdateDto} from "../dto/user-update.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 201, type:()=> UserEntity})
    @Post('create')
    async createUser(@Body() data: UserCreateDto): Promise<UserEntity> {
        return this.usersService.createUser(data);
    }

    @ApiOperation({summary: 'Рендеринг страницы авторизации'})
    @ApiResponse({status: 200})
    @Get('login')
    @Render('user-login')
    async loginUser() {

    }

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type:()=> [UserEntity]})
    @UseGuards(AuthGuard)
    @Get('get-all')
    async getUsers(@Req() request): Promise<UserEntity[]> {
        return this.usersService.getUsers();
    }

    @ApiOperation({summary: 'Получение пользователя по id'})
    @ApiResponse({status: 200, type:()=> UserEntity})
    @UseGuards(AuthGuard)
    @Get('get-one')
    async getUser(@Req() request, @Query() query: ParamIdDto): Promise<UserEntity> {
        return await this.usersService.findById(query.id);
    }

    @ApiOperation({summary: 'Получение пользователя по id с выводом данных в браузере'})
    @ApiResponse({status: 200, type:()=> UserEntity})
    @Get('get-one-render')
    @Render('user-update')
    getUserRender(@Query() query: ParamIdDto) {
        return this.usersService.findById(query.id)
            .then((data) => data ? {result: data} : {result: null})
    }

    @ApiOperation({summary: 'Редактирование пользователя'})
    @ApiResponse({status: 200, type: ()=>UserEntity})
    @UseGuards(AuthGuard)
    @Put('update')
    async updateUser(@Req() request, @Query() query: ParamIdDto, @Body() data: UserEntity): Promise<UserEntity> {
        const _user = await this.usersService.findById(query.id);
        if (request.user.email !== _user.email) {
            throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN);
        }
        return this.usersService.updateUser(query.id, data);
    }

    @ApiOperation({summary: 'Загрузка аватарки пользователя'})
    @ApiResponse({status: 200, type: ()=>UserEntity})
    @Post('upload-avatar')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './public/uploads',
                filename: FileName,
            }),
            fileFilter: FileFilter,
        }),
    )
    async upload(
        @UploadedFile() file: Express.Multer.File,
        @Query() query: ParamIdDto,
    ) {
        const _user = await this.usersService.findById(query.id);

        if (!_user) {
            throw new HttpException(
                'Не существует такого автора', HttpStatus.BAD_REQUEST,
            );
        }
        const newBody = {
            ..._user,
            avatar: file.filename
        }
        return this.usersService.updateUser(query.id, newBody);

    }

    @ApiOperation({summary: 'Удаление пользователя'})
    @ApiResponse({status: 200, type: ()=>[UserEntity]})
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Delete('delete')
    async deleteUser(@Query() query: ParamIdDto,
    ): Promise<UserEntity[]> {
        return this.usersService.deleteUser(query.id);
    }


}
