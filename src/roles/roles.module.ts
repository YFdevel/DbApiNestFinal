import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../database/entities/user.entity";
import {RoleEntity} from "../database/entities/role.entity";
import {UsersRolesEntity} from "../database/entities/users_roles.entity";

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,RoleEntity,UsersRolesEntity])],
  controllers: [RolesController],
  providers: [RolesService],
  exports:[RolesService]
})
export class RolesModule {}
