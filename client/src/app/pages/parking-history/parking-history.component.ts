import { Pagination } from './../../shared/models/page.model';
import { Component, OnInit } from '@angular/core';
import { ParkingService } from './../../service/parking.service';

@Component({
    selector: 'app-parking-history',
    moduleId: module.id,
    templateUrl: './parking-history.component.html'
})

export class ParkingHistoryComponent implements OnInit {
    pageData: Pagination = new Pagination();
    parkings: any[] = [];

    constructor(
        private readonly parkingService: ParkingService
    ) { }

    ngOnInit() {
        this.getParkings();
    }

    getParkings() {
        this.parkingService.get({
            page: this.pageData.currentPage,
            limit: this.pageData.pageSize
        }).subscribe(parking => {
            this.parkings = parking[0];
            this.parkings.forEach(parking => {
                if (!parking.status) parking.totalTime = new Date(parking.timeOut).getTime() - new Date(parking.createdAt).getTime() + new Date().getTimezoneOffset() * 1000 * 60;
            })
            this.pageData.totalSize = parking[1];
        })
    }

    pageChange(page: number) {
        this.getParkings();
    }
}
