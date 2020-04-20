import { IPageOptions } from './../interface/attribute.interface';
import { ApiProperty } from "@nestjs/swagger";
import { ParkingStatus } from './../constants/model.constants';

export class ParkingQuery implements IPageOptions {
    @ApiProperty({ type: 'number', required: false })
    position?: number;

    @ApiProperty({ type: 'enum', enum: ParkingStatus, required: false })
    status?: string;

    @ApiProperty({ type: 'number', required: false })
    time?: number;

    @ApiProperty({ type: 'number', required: false })
    cost?: number;

    @ApiProperty({ type: 'number', required: false })
    limit?: number;

    @ApiProperty({ type: 'number', required: false })
    page?: number;
}
