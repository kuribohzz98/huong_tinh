import { Injectable } from "@angular/core";
import { IParking } from './../../shared/models/parking.model';
import { NotifyType } from './../../constants/notify.constants';

@Injectable({ providedIn: 'root' })
export class ManagerParkingService {
    private _notifications: any[] = [];
    private preColor: number;

    addNotification(parking: IParking) {
        const data = { ...parking } as any;
        data.totalTime = new Date(parking.timeOut).getTime() - new Date(parking.createdAt).getTime();
        data.color = this.randomColor();
        this._notifications.push(data);
        setTimeout(() => {
            this.removeNotification(parking.id);
        }, 30 * 1000);
    }

    private randomColor(): NotifyType {
        const random = Math.floor(Math.random() * 4) + 1;
        if (this.preColor && this.preColor == random) {
            this.randomColor();
            return;
        }
        this.preColor = random;
        switch (random) {
            case 1: return NotifyType.Info
            case 2: return NotifyType.Danger
            case 3: return NotifyType.Success
            default: return NotifyType.Warning
        }
    }



    private removeNotification(id: number) {
        const index = this._notifications.findIndex(notify => notify.id == id);
        if (!index) return;
        this._notifications.splice(index, 1);
    }

    get notifications() {
        return this._notifications;
    }
}