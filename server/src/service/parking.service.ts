import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Parking } from './../entity/parking.entity';
import { ParkingRepository } from './../repository/parking.repository';
import { ParkingAttribute, IPageOptions } from './../interface/attribute.interface';
import { ParkingStatus } from './../constants/model.constants';
import { caculatorCost } from '../utils/fomular';

@Injectable()
export class ParkingService implements OnModuleInit {
    private logger = new Logger('ParkingService');

    private topic1: boolean = false;
    private topic2: boolean = false;
    private topic3: boolean = false;
    private topic4: boolean = false;

    constructor(
        private readonly parkingRepository: ParkingRepository
    ) { }

    async onModuleInit() {
        await this.clear();
        this.logger.log('clear done');
    }

    async getParkings(parkingAtt: ParkingAttribute, pageOpts?: IPageOptions): Promise<[Parking[], number]> {
        return this.parkingRepository.getParkings(parkingAtt, pageOpts);
    }

    async getById(id: number) {
        return this.parkingRepository.findOne(+id);
    }

    async updateTopic(position: number, parked?: boolean) {
        if (parked) {
            const parking = this.parkingRepository.create();
            parking.position = position;
            parking.status = ParkingStatus.PARKED;
            return this.parkingRepository.save(parking);
        }
        const parking = await this.parkingRepository.findOne({ position, status: ParkingStatus.PARKED });
        if (!parking) {
            this.logger.log('parking is not found');
            return;
        }
        const timeOut = new Date();
        const cost = caculatorCost(new Date(parking.createdAt), timeOut);
        return this.parkingRepository.update({ id: parking.id }, { cost, timeOut, status: null });
    }

    async topicChange(position: number, status: boolean): Promise<boolean> {
        const isUpdate = this.updateStatusTopic(position, status);
        if (isUpdate) {
            if (!status) {
                await this.updateTopic(position);
                return true;
            }
            await this.updateTopic(position, true);
            return true;
        }
        return false;
    }

    private updateStatusTopic(position: number, status: boolean): boolean {
        switch (position) {
            case 1:
                if (status != this.topic1) {
                    this.topic1 = !this.topic1;
                    return true;
                }
                return false;
            case 2:
                if (status != this.topic2) {
                    this.topic2 = !this.topic2;
                    return true;
                }
                return false;
            case 3:
                if (status != this.topic3) {
                    this.topic3 = !this.topic3;
                    return true;
                }
                return false;
            default:
                if (status != this.topic4) {
                    this.topic4 = !this.topic4;
                    return true;
                }
                return false;
        }
    }

    async clear() {
        const parking = await this.parkingRepository.find({ status: ParkingStatus.PARKED });
        return this.parkingRepository.remove(parking);
    }
}