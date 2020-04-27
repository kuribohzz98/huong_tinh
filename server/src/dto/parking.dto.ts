import { IPageOptions } from './../interface/attribute.interface';
import { ApiProperty } from "@nestjs/swagger";
import { ParkingStatus } from './../constants/model.constants';

export class ParkingQuery implements IPageOptions {
    @ApiProperty({ required: false })
    position?: number;

    @ApiProperty({ enum: ParkingStatus, required: false })
    status?: string;

    @ApiProperty({ required: false })
    timeOut?: Date;

    @ApiProperty({ required: false })
    cost?: number;

    @ApiProperty({ required: false })
    limit?: number;

    @ApiProperty({ required: false })
    page?: number;
}
