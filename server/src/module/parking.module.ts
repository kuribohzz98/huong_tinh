import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingRepository } from './../repository/parking.repository';
import { ParkingService } from './../service/parking.service';
import { ParkingController } from './../controller/parking.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([ParkingRepository])
    ],
    controllers: [ParkingController],
    providers: [ParkingService],
    exports: [ParkingService]
})
export class ParkingModule { }
