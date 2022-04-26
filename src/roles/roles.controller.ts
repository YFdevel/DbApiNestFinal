import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {CreateRoleDto} from "../dto/create-role.dto";
import {DeleteRoleDto} from "../dto/delete-role.dto";
import {RolesService} from "./roles.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "../database/entities/user.entity";
import {RoleEntity} from "../database/entities/role.entity";

@ApiTags('Роли')
@Controller('roles')
export class RolesController {

    constructor(private readonly rolesService: RolesService) {}

    @ApiOperation({summary: 'Создание роли пользователей'})
    @ApiResponse({status: 201, type: RoleEntity})
    @Post('create')
    create(@Body() params: CreateRoleDto) {
        return this.rolesService.create(params);
    }

    @ApiOperation({summary: 'Удаление роли'})
    @ApiResponse({status: 200, type: RoleEntity})
    @Delete('delete')
    delete(@Body()  {value} : DeleteRoleDto) {
        return this.rolesService.deleteByValue(value);
    }

    @ApiOperation({summary: 'Получение роли'})
    @ApiResponse({status: 200, type: RoleEntity})
    @Get('get')
    get(@Body() { value }: DeleteRoleDto) {
        return this.rolesService.getByValue(value);
    }
}
