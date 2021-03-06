import { ParkingAttribute, IPageOptions } from './../interface/attribute.interface';
import { Parking } from './../entity/parking.entity';
import { BaseRepository } from './../base/BaseRepository';
import { EntityRepository } from 'typeorm';

@EntityRepository(Parking)
export class ParkingRepository extends BaseRepository<Parking, ParkingAttribute> {

    getParkings(parkingAttr: ParkingAttribute, pageOpts?: IPageOptions): Promise<[Parking[], number]> {
        const page = this.getPageOpts(pageOpts);
        return this.findAndCount({ where: parkingAttr, ...page });
    }
}