import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";
import { BaseEntity } from './../base/BaseEntity';
import { ParkingAttribute } from './../interface/attribute.interface';
import { ParkingStatus } from './../constants/model.constants';

@Entity({ name: 'parking' })
export class Parking extends BaseEntity<ParkingAttribute> implements ParkingAttribute {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'int',
        width: 11,
        nullable: false
    })
    position: number;

    @Column({
        type: 'enum',
        enum: ParkingStatus,
        nullable: true
    })
    status: string;

    @Column({
        type: 'datetime',
        nullable: true
    })
    timeOut: Date;

    @Column({
        type: 'int',
        width: 11,
        nullable: true
    })
    cost: number;

    @Column({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
}