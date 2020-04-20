import { Injectable } from '@nestjs/common';
import { Parking } from './../entity/parking.entity';
import { ParkingRepository } from './../repository/parking.repository';
import { ParkingAttribute, IPageOptions } from './../interface/attribute.interface';

@Injectable()
export class ParkingService {
    constructor(
        private readonly parkingRepository: ParkingRepository
    ) {}
    
    async getParkings(parkingAtt: ParkingAttribute, pageOpts?: IPageOptions): Promise<Parking[]> {
        return this.parkingRepository.getParkings(parkingAtt, pageOpts);
    }
}