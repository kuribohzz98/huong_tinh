import { Injectable } from "@angular/core";
import { BaseService } from './base.service';
import { IParking, IParkingPage } from './../shared/models/parking.model';

@Injectable({ providedIn: 'root' })
export class ParkingService extends BaseService<IParking, IParkingPage> {
    path_url: string = '/parking';
}
