import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ParkingService } from './../../../service/parking.service';
import { IParking } from './../../../shared/models/parking.model';

@Component({
    selector: 'app-parking-modal',
    templateUrl: './parking-modal.component.html'
})
export class ParkingModalComponent implements OnInit {
    @Input() id: number;

    parking: IParking = {};
    totalTime: number;

    constructor(
        public readonly activeModal: NgbActiveModal,
        private readonly parkingService: ParkingService
    ) { }

    ngOnInit(): void {
        this.id && this.parkingService.getOne(+this.id).subscribe(parking => {
            this.parking = parking;
            this.totalTime = new Date().getTime() - new Date(this.parking.createdAt).getTime() + new Date().getTimezoneOffset()*1000*60;
        })
    }
}