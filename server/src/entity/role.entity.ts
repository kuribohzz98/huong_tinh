import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";
import { RoleAttribute } from '../interface/attribute.interface';
import { BaseEntity } from '../base/BaseEntity';
import { User } from './user.entity';

@Entity({ name: 'role' })
export class Role extends BaseEntity<RoleAttribute> implements RoleAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: false
    })
    code: string;

    users: User[];
}
