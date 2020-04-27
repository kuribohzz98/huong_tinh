import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KeySessionStorage } from 'app/constants/storage.constants';
import { AccountService } from './../../auth/account.service';
import { EAccountModalType } from './../../constants/common.constants';
import { StorageService } from './../service/storage.service';
import { AccountModalComponent } from './../../pages/account/account-modal/account-modal.component';
import { NotifyService } from './../service/notify.service';

@Component({
  moduleId: module.id,
  selector: 'fixedplugin-cmp',
  templateUrl: 'fixedplugin.component.html'
})

export class FixedPluginComponent implements OnInit {
  constructor(
    private readonly modalService: NgbModal,
    private readonly storageService: StorageService,
    private readonly accountService: AccountService,
    private readonly notifyService: NotifyService
  ) { }

  public sidebarColor: string = "white";
  public sidebarActiveColor: string = "danger";

  public state: boolean = true;

  ngOnInit(): void { }

  changeSidebarColor(color): void {
    var sidebar = <HTMLElement>document.querySelector('.sidebar');

    this.sidebarColor = color;
    if (sidebar != undefined) {
      sidebar.setAttribute('data-color', color);
    }
  }
  changeSidebarActiveColor(color): void {
    var sidebar = <HTMLElement>document.querySelector('.sidebar');
    this.sidebarActiveColor = color;
    if (sidebar != undefined) {
      sidebar.setAttribute('data-active-color', color);
    }
  }

  openModalChangePassword() {
    const modalRef = this.modalService.open(AccountModalComponent);
    modalRef.componentInstance.id = this.storageService.getItemSession(KeySessionStorage.userId);
    modalRef.componentInstance.type = EAccountModalType.ChangePassword;
    modalRef.componentInstance.username = this.accountService.userIdentity.username;
    modalRef.result.then(result => {
      if (result == 'success') {
        this.notifyService.showNotifySuccess('Đổi mật khẩu thành công');
      }
    })
  }

}
