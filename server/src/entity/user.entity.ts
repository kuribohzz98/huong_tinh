import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { BaseEntity } from '../base/BaseEntity';
import { UserAttribute } from '../interface/attribute.interface';
import { Role } from "./role.entity";

@Entity({ name: 'user' })
export class User extends BaseEntity<UserAttribute> implements UserAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: '45',
        nullable: false,
        unique: true
    })
    username: string;

    @Column({
        type: 'varchar',
        length: '255',
        nullable: false
    })
    password: string;

    @Column({
        type: 'int',
        width: 11,
        nullable: true
    })
    roleId: number;

    @Column({
        type: 'varchar',
        length: '255',
        nullable: true
    })
    salt: string;

    @Column({
        type: 'int',
        width: 11,
        nullable: true
    })
    iterations: number;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @ManyToOne(type => Role, role => role)
    @JoinColumn({ name: "roleId" })
    role: Role;
}
