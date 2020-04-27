import { UserProfileDto } from './../dto/user.dto';
import { Injectable } from '@nestjs/common';
import { RoleConstant } from './../constants/model.constants';
import { Role } from './../entity/role.entity';
import { User } from './../entity/user.entity';
import { UserAttribute, IPageOptions } from './../interface/attribute.interface';
import { UserRepository } from './../repository/user.repository';
import { UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        public readonly userRepository: UserRepository
    ) { }

    async getUserByName(username: any): Promise<User> {
        return this.userRepository.getOneByOptions({ username });
    }

    async getInfoUser(userAttribute: UserAttribute): Promise<User> {
        return this.userRepository.getInfoUser(userAttribute);
    }

    async getRoleByCode(code: RoleConstant): Promise<Role> {
        return this.userRepository.manager.getRepository<Role>('Role').findOne({ code });
    }

    async getUserById(id: number): Promise<UserProfileDto> {
        const user = await this.userRepository.getInfoUser({ id });
        return new UserProfileDto(user);
    }

    async getUsers(userAttr: UserAttribute, pageOpts?: IPageOptions): Promise<[UserProfileDto[], number]> {
        const users = await this.userRepository.getUsers(userAttr, pageOpts);
        const userInfoDtos = users[0].map(user => new UserProfileDto(user));
        return [userInfoDtos, users[1]];
    }

    async getRoles(): Promise<Role[]> {
        return this.userRepository.manager.getRepository<Role>('Role').find();
    }

    async updateRole(userId: number, roleId: number): Promise<UpdateResult> {
        return this.userRepository.update({ id: userId }, { roleId })
    }

    async delete(id: number) {
        return this.userRepository.remove({ id } as User);
    }
}
