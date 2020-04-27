import { ManagerParkingService } from './manager-parking.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, of, forkJoin } from 'rxjs';
import { takeUntil, mergeMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParkingModalComponent } from './parking-modal/parking-modal.component';
import { SocketService } from './../../shared/service/socket.service';
import { ParkingService } from './../../service/parking.service';
import { IParking } from './../../shared/models/parking.model';
import { EStatusParking, ESocketChannel } from './../../constants/common.constants';

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
        public readonly managerParkingService: ManagerParkingService
    ) { }

    ngOnInit(): void {
        this.initParkings();
        this.initSocket();
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
            .pipe(
                mergeMap((position: number) => {
                    let parking: Observable<[IParking[], number]>;
                    let parkingOut: Observable<IParking>;
                    if (position == 1 && !this.parking1.id || position == 2 && !this.parking2.id ||
                        position == 3 && !this.parking3.id || position == 4 && !this.parking4.id) {
                        parking = this.parkingService.get({ status: EStatusParking.PARKED, position });
                    }
                    if (position == 1 && this.parking1.id || position == 2 && this.parking2.id ||
                        position == 3 && this.parking3.id || position == 4 && this.parking4.id) {
                        parkingOut = this.parkingService.getOne(this[`parking${position}`].id);
                    }
                    return forkJoin(of(position), parking, parkingOut)
                }),
                takeUntil(this._destroys$)
            )
            .subscribe(data => {
                if (data[2]) this.managerParkingService.addNotification(data[2]);
                if (data[0] == 1) {
                    if (data[1]) this.parking1 = data[1][0].pop();
                    else this.parking1 = {};
                }
                if (data[0] == 2) {
                    if (data[1]) this.parking2 = data[1][0].pop();
                    else this.parking2 = {};
                }
                if (data[0] == 3) {
                    if (data[1]) this.parking3 = data[1][0].pop();
                    else this.parking3 = {};
                }
                if (data[0] == 4) {
                    if (data[1]) this.parking4 = data[1][0].pop();
                    else this.parking4 = {};
                }
                this.caculatorSlotBlank();
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

    open(id: number): void {
        const modalRef = this.modalService.open(ParkingModalComponent);
        modalRef.componentInstance.id = id;
    }

    ngOnDestroy(): void {
        this._destroys$.next(true);
        this._destroys$.complete();
    }
}
