import { ManagerParkingService } from './manager-parking.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParkingModalComponent } from './parking-modal/parking-modal.component';
import { SocketService } from './../../shared/service/socket.service';
import { ParkingService } from './../../service/parking.service';
import { IParking } from './../../shared/models/parking.model';
import { EStatusParking, ESocketChannel } from './../../constants/common.constants';
import { AccountService } from './../../auth/account.service';

@Component({
    selector: 'manager-parking-cmp',
    moduleId: module.id,
    templateUrl: './manager-parking.component.html',
    styleUrls: ['./manager-parking.component.scss']
})

export class ManagerParkingComponent implements OnInit, OnDestroy {

    parking1: IParking = {};
    parking2: IParking = {};
    parking3: IParking = {};
    parking4: IParking = {};
    slotBlank: number = 0;

    private _destroys$: Subject<boolean> = new Subject();
    constructor(
        private readonly modalService: NgbModal,
        private readonly socketService: SocketService,
        private readonly parkingService: ParkingService,
        public readonly managerParkingService: ManagerParkingService,
        private readonly accountService: AccountService
    ) { }

    ngOnInit(): void {
        this.initSocket();
        this.initParkings();
    }

    private initParkings(): void {
        this.parkingService.get({ status: EStatusParking.PARKED }).subscribe(parkings => {
            parkings[0].map(parking => {
                if (parking.position == 1) this.parking1 = parking;
                if (parking.position == 2) this.parking2 = parking;
                if (parking.position == 3) this.parking3 = parking;
                if (parking.position == 4) this.parking4 = parking;
            })
            this.caculatorSlotBlank();
        })
    }

    private initSocket(): void {
        this.socketService.watchChannel(ESocketChannel.HasChange)
            .pipe(takeUntil(this._destroys$))
            .subscribe((position: number) => {
                if (position == 1 && !this.parking1.id || position == 2 && !this.parking2.id ||
                    position == 3 && !this.parking3.id || position == 4 && !this.parking4.id) {
                    this.parkingService.get({ status: EStatusParking.PARKED, position }).subscribe(parkings => {
                        if (position == 1) {
                            if (parkings) this.parking1 = parkings[0].pop();
                            else this.parking1 = {};
                        }
                        if (position == 2) {
                            if (parkings) this.parking2 = parkings[0].pop();
                            else this.parking2 = {};
                        }
                        if (position == 3) {
                            if (parkings) this.parking3 = parkings[0].pop();
                            else this.parking3 = {};
                        }
                        if (position == 4) {
                            if (parkings) this.parking4 = parkings[0].pop();
                            else this.parking4 = {};
                        }
                        this.caculatorSlotBlank();
                    });
                }
                if (position == 1 && this.parking1.id || position == 2 && this.parking2.id ||
                    position == 3 && this.parking3.id || position == 4 && this.parking4.id) {
                    this.parkingService.getOne(this[`parking${position}`].id).subscribe(parking => {
                        let parking_temp = { ...parking };
                        parking_temp.timeOut = new Date(new Date(parking_temp.timeOut).getTime() + new Date().getTimezoneOffset() * 1000 * 60);
                        this[`parking${position}`] = {};
                        if (parking) this.managerParkingService.addNotification(parking_temp);
                        this.caculatorSlotBlank();
                    });
                }
            });
    }

    private caculatorSlotBlank(): void {
        let slotBlank = 0;
        if (!this.parking1.id) slotBlank++;
        if (!this.parking2.id) slotBlank++;
        if (!this.parking3.id) slotBlank++;
        if (!this.parking4.id) slotBlank++;
        this.slotBlank = slotBlank;
    }

    get user() {
        return this.accountService.userIdentity;
    }

    open(id: number): void {
        if (!this.user) return;
        const modalRef = this.modalService.open(ParkingModalComponent);
        modalRef.componentInstance.id = id;
    }

    ngOnDestroy(): void {
        this._destroys$.next(true);
        this._destroys$.complete();
    }
}
