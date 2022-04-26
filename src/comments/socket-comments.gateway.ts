import {
    SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import * as cookie from 'cookie';
import {HttpException, HttpStatus, Logger} from '@nestjs/common';
import {Socket, Server} from 'socket.io';
import {PostsService} from "../posts/posts.service";
import {UsersService} from "../users/users.service";
import {CommentsService} from "./comments.service";
import {CommentCreateDto} from "../dto/comment-create.dto";
import {CommentEntity} from "../database/entities/comment.entity";
import {PostUserIdDto} from "../dto/post-user-id.dto";


export type Comment = {
    text: string;
    userId: number;
    postId: number;
};
export type Delete={
    userId:number,
    ownerId:number,
    commentId:number,
}

@WebSocketGateway()
export class SocketCommentsGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly postsService: PostsService,
                private readonly usersService: UsersService,
                private readonly commentsService: CommentsService) {
    }

    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('SocketCommentsGateway');

    @SubscribeMessage('commentToServer')
    async handleComment(client: Socket, payload: CommentCreateDto) {
        const comment = await this.commentsService.createComment(payload);
        this.server.emit('commentToClient', comment);
    }
    @SubscribeMessage('updateCommentToServer')
    async updateComment(client: Socket, payload: CommentCreateDto) {
       await this.commentsService.updateComment(payload.id,payload);
        const comments = await this.commentsService.getComments();
        this.server.emit('initialComments', comments);
    }
    @SubscribeMessage('deleteCommentToServer')
    async handleDeleteComment(client: Socket, payload: Delete) {
        const user=await this.usersService.findById(payload.userId);
        if(user.roles.some(role=>role.value=="admin")||payload.userId==payload.ownerId){
            await this.commentsService.deleteComment(payload.commentId);
            const comments = await this.commentsService.getComments();
            this.server.emit('initialComments', comments);
        }
       else{
            throw new HttpException("Нет доступа",HttpStatus.FORBIDDEN);
        }

    }

    @SubscribeMessage('postIdToServer')
    async handlePostId(client: Socket, payload: number) {
        const comments = await this.commentsService.getCommentsByPost(payload);
        this.server.emit('initialComments', comments);
    }

    async afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected:${client.id}`);

    }
}
