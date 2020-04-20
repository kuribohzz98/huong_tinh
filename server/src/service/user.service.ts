import { Injectable } from '@nestjs/common';
import { RoleConstant } from './../constants/model.constants';
import { Role } from './../entity/role.entity';
import { User } from './../entity/user.entity';
import { UserAttribute } from './../interface/attribute.interface';
import { UserRepository } from './../repository/user.repository';

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
}
