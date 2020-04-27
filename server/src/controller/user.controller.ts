import { Controller, Get, Query, Param, Put, Body, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from './../service/user.service';
import { UserProfileDto } from "../dto/user.dto";
import { UserQuery } from './../dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get(':id')
    async getOne(@Param('id') id: number): Promise<UserProfileDto> {
        const user = await this.userService.getUserById(+id);
        return user;
    }

    @Get('')
    async get(@Query() query: UserQuery) {
        const users = await this.userService.getUsers(query, { limit: query.limit, page: query.page });
        return users;
    }

    @Get('get-role/all')
    async getRole() {
        const roles = await this.userService.getRoles();
        return roles;
    }

    @Put()
    async update(@Body() body: { id: number, roleId: number }) {
        const upd = await this.userService.updateRole(+body.id, +body.roleId);
        if (!upd) {
            return { message: 'faild' };
        }
        return { message: 'success' };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const _delete = await this.userService.delete(+id);
        if (!_delete) {
            return { message: 'faild' };
        }
        return { message: 'success' };
    }
}