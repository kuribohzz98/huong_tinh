import { RoleConstant } from './../constants/model.constants';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './../entity/user.entity';

export class UserLoginDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}

export class UserRegisterDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ type: 'enum', enum: RoleConstant })
    role: RoleConstant;
}

export class UserProfileDto {
    id: number;
    username: string;
    role: string;

    constructor(user: User) {
        this.id = user.id;
        this.username = user.username;
        this.role = user.role.code;
    }
}

export class UserQuery {
    @ApiProperty({required: false})
    id: number;

    @ApiProperty({required: false})
    username: string;

    @ApiProperty({required: false})
    page: number;

    @ApiProperty({required: false})
    limit: number;
}