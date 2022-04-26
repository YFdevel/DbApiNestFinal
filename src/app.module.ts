import {HttpModule, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { MailModule } from './mail/mail.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import {MailController} from "./mail/mail.controller";
import {PostsController} from "./posts/posts.controller";
import {CommentsController} from "./comments/comments.controller";
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./database/entities/user.entity";
import {RoleEntity} from "./database/entities/role.entity";
import {UsersRolesEntity} from "./database/entities/users_roles.entity";
import {SessionEntity} from "./database/entities/session.entity";



@Module({
  imports: [PostsModule, CommentsModule, MailModule,ConfigModule.forRoot({
    envFilePath:'.env'
  }),
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..','public'),
  }), UsersModule,DatabaseModule, RolesModule, AuthModule,
    TypeOrmModule.forFeature([UserEntity,RoleEntity,UsersRolesEntity,SessionEntity])],
  controllers: [AppController,PostsController, CommentsController,MailController],
  providers: [AppService,
  ],
})
export class AppModule {}
