import { EAccountModalType } from './../../constants/common.constants';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from './../../shared/models/user.model';
import { AccountService } from './../../auth/account.service';
import { NotifyService } from '../../shared/service/notify.service';
import { Pagination } from './../../shared/models/page.model';
import { AccountModalComponent } from './account-modal/account-modal.component';


@Component({
  selector: 'app-account',
  moduleId: module.id,
  templateUrl: './account.component.html'
})

export class AccountComponent implements OnInit {
  accounts: IUser[] = [];
  pageData: Pagination = new Pagination();

  constructor(
    private readonly notifyService: NotifyService,
    private readonly accountService: AccountService,
    private readonly modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.get({
      page: this.pageData.currentPage,
      limit: this.pageData.pageSize
    }).subscribe(accounts => {
      this.accounts = accounts[0];
      this.pageData.totalSize = accounts[1];
    })
  }

  pageChange(page: number): void {
    this.getAccounts();
  }

  openRemoveModal(id: number) {
    const modalRef = this.modalService.open(AccountModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = EAccountModalType.Remove;
    modalRef.result.then(result => {
      if (result == 'success') {
        this.notifyService.showNotifySuccess('Xoá tài khoản thành công');
        this.getAccounts();
      }
    })
  }

  openEditRoleModal(id: number) {
    const modalRef = this.modalService.open(AccountModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = EAccountModalType.EditRole;
    modalRef.result.then(result => {
      if (result == 'success') {
        this.notifyService.showNotifySuccess('Thay đổi quyền thành công');
        this.getAccounts();
      }
    })
  }

  openChangePasswordModal(id: number) {
    const modalRef = this.modalService.open(AccountModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = EAccountModalType.ChangePassword;
    modalRef.componentInstance.username = this.accounts.find(account => account.id == id).username;
    modalRef.result.then(result => {
      if (result == 'success') {
        this.notifyService.showNotifySuccess('Đổi mật khẩu thành công');
        this.getAccounts();
      }
    })
  }

  openCreateAccount() {
    const modalRef = this.modalService.open(AccountModalComponent);
    modalRef.componentInstance.type = EAccountModalType.Create;
    modalRef.result.then(result => {
      if (result == 'success') {
        this.notifyService.showNotifySuccess('Tạo tài khoản thành công');
        this.getAccounts();
      }
    })
  }
}
