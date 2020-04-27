import { ToastrService } from 'ngx-toastr';
import { Injectable } from "@angular/core";
import * as NotifyConstants from '../../constants/notify.constants';

@Injectable({ providedIn: 'root' })
export class NotifyService {

    constructor(private toastr: ToastrService) { }

    public showNotify(
        message: string,
        type: NotifyConstants.NotifyType,
        icon?: string,
        placement?: {
            from: NotifyConstants.NotifyPositionFrom,
            align: NotifyConstants.NotifyPositionAlign
        }
    ): void {
        if (!placement) placement = {} as any;
        this.toastr.show(
            `<span data-notify="icon" class="nc-icon ${icon}"></span><span data-notify="message">${message}</span>`,
            "",
            {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: `alert alert-${type} alert-with-icon`,
                positionClass: "toast-" + (placement.from || NotifyConstants.NotifyPositionFrom.Top) + "-" + (placement.align || NotifyConstants.NotifyPositionAlign.Right),

            }
        );
    }

    public showNotifySuccess(message: string): void {
        this.showNotify(message, NotifyConstants.NotifyType.Success, 'nc-check-2');
    }

    public showNotifyInfo(message: string): void {
        this.showNotify(message, NotifyConstants.NotifyType.Info, 'nc-alert-circle-i');
    }

    public showNotifyWarning(message: string): void {
        this.showNotify(message, NotifyConstants.NotifyType.Warning, 'nc-bell-55');
    }

    public showNotifyDanger(message: string): void {
        this.showNotify(message, NotifyConstants.NotifyType.Danger, 'nc-simple-remove');
    }

    public showNotifyPrimary(message: string): void {
        this.showNotify(message, NotifyConstants.NotifyType.Primary, 'nc-bell-55');
    }
}
