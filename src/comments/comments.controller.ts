import {
    Body,
    Controller,
    Delete,
    Get, HttpException, HttpStatus,
    Post,
    Put,
    Query, Render, Req,
    UploadedFile, UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {DecrementBodyId} from '../utils/decrement-body-id.decorator';
import {DecrementQueryId} from '../utils/decrement-query-id.decorator';
import {CommentCreateDto} from '../dto/comment-create.dto';
import {PostCreateDto} from '../dto/post.-create.dto';
import {CommentsService} from './comments.service';
import {PostCommentIdDto} from '../dto/post-comment-id.dto';
import {ParamIdDto} from '../dto/param-id.dto';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {extname} from 'path';
import {FileName, FileFilter} from '../utils/upload-img.utils';
import {Express} from 'express';
import {CommentEntity} from "../database/entities/comment.entity";
import {PostEntity} from "../database/entities/post.entity";
import {UsersService} from "../users/users.service";
import {PostsService} from "../posts/posts.service";
import {AuthGuard} from "../auth/auth-guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles-guard";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "../database/entities/user.entity";

@ApiTags('Комментарии')
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService,
                private readonly usersService: UsersService,
                private readonly postsService: PostsService,) {}

    @ApiOperation({summary: 'Получение всех комментариев c рендерингом в браузере'})
    @ApiResponse({status: 200,type:()=>[CommentEntity]})
    @Get('/')
    @Render('show-comments')
   async getComments()
    {
        return await this.commentsService.getComments()
             .then((data)=>data? {result:data}:{result:[]})
    }

    @ApiOperation({summary: 'Получение одного комментария по id поста c рендерингом в браузере'})
    @ApiResponse({status: 200,type:()=>CommentCreateDto})
    @Get('/get-by-post')
    @Render('show-comments')
    async getCommentsByPost(@Query()query: ParamIdDto)
    {
        const _post = await this.postsService.getPost(query.id);
        if (!_post) {
            throw new HttpException(
                'Не существует такого поста', HttpStatus.BAD_REQUEST,
            );
        }

        return this.commentsService.getCommentsByPost(query.id)
             .then((data)=>data? {result:data}:{result:[]})

    }

    @ApiOperation({summary: 'Получение одного комментария по id поста'})
    @ApiResponse({status: 200,type:()=>CommentCreateDto})
    @Get('/get-one')
    async getComment(@Query() query: PostCommentIdDto,): Promise<CommentEntity[]> {
        const _post = await this.postsService.getPost(query.postId);
        const _comment = await this.commentsService.getCommentById(query.commentId);
        if (!_post) {
            throw new HttpException(
                'Не существует такого поста', HttpStatus.BAD_REQUEST,
            );
        }
        if (!_comment) {
            throw new HttpException(
                'Не существует комментария', HttpStatus.BAD_REQUEST,
            );
        }
        return this.commentsService.getComment(query.postId, query.commentId);
    }

    @ApiOperation({summary: 'Создание комментария'})
    @ApiResponse({status: 201,type:()=>CommentCreateDto})
    @Post('create')
    async createComment(@Body() data: CommentCreateDto): Promise<CommentEntity> {
      return await this.commentsService.createComment(data);
    }

    @ApiOperation({summary: 'Удаление комментария'})
    @ApiResponse({status: 200, type:()=> [CommentEntity]})
    @UseGuards(AuthGuard)
    @Delete('delete')
    async deleteComment(@Req()request,
        @Query() query: ParamIdDto): Promise<CommentEntity[]>
    {
        const _comment = await this.commentsService.getCommentById(query.id);


        if (request.user.email !== _comment.user.email&&!request.user.roles.some(role=>role.value==="admin")) {
            throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN);
        }
         return this.commentsService.deleteComment(query.id);
    }

    @ApiOperation({summary: 'Редактирование комментария'})
    @ApiResponse({status: 200,type:()=>CommentCreateDto})
    @Put('update')
    async updateComment(
        @Query() query: ParamIdDto,
        @Body() data: CommentCreateDto,
    ): Promise<CommentEntity> {
        const _user = await this.usersService.findById(data.userId);
        const _post = await this.postsService.getPost(data.postId);
        const _comment = await this.commentsService.getCommentById(query.id);
        if (!_comment) {
            throw new HttpException(
                'Не существует такого комментария', HttpStatus.BAD_REQUEST,
            );
        }
        if (!_user) {
            throw new HttpException(
                'Не существует такого автора', HttpStatus.BAD_REQUEST,
            );
        }
        if (!_post) {
            throw new HttpException(
                'Не существует такого поста', HttpStatus.BAD_REQUEST,
            );
        }
        return this.commentsService.updateComment(query.id,data);
    }



}
