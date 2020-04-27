import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../../auth/account.service';
import { EAccountModalType } from './../../../constants/common.constants';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthServerProvider } from './../../../auth/auth-jwt.service';
import { NotifyService } from './../../../shared/service/notify.service';

@Component({
    selector: 'app-account-modal',
    templateUrl: './account-modal.component.html'
})
export class AccountModalComponent implements OnInit {
    @Input() id: number;
    @Input() type: EAccountModalType;
    @Input() username: string;

    title: string;
    buttonSuccesText: string = 'Có';
    EAccountType = EAccountModalType;
    roles: any[] = [];

    formChangePassword: FormGroup;
    formCreate: FormGroup;
    formEditRole: FormControl = new FormControl('', Validators.required);

    constructor(
        public readonly activeModal: NgbActiveModal,
        private readonly accountService: AccountService,
        private readonly authServerProvider: AuthServerProvider,
        private readonly fb: FormBuilder,
        private readonly notifyService: NotifyService
    ) { }

    ngOnInit(): void {
        if (this.type == EAccountModalType.Remove) {
            this.title = 'Xoá tài khoản';
        } else if (this.type == EAccountModalType.EditRole) {
            this.title = 'Thay đổi quyền';
            this.buttonSuccesText = 'Lưu';
            this.accountService.getRoles().subscribe(res => {
                this.roles = res;
            })
        } else if (this.type == EAccountModalType.Create) {
            this.title = 'Tạo tài khản';
            this.buttonSuccesText = 'Tạo';
            this.accountService.getRoles().subscribe(res => {
                this.roles = res;
            })
        } else {
            this.title = 'Đổi mật khẩu';
            this.buttonSuccesText = 'Lưu';
        }

        this.formChangePassword = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
        })

        this.formCreate = this.fb.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
            role: ['', Validators.required]
        })
    }

    onSubmit(): void {
        if (this.type == EAccountModalType.Remove) {
            this.accountService.delete(this.id).subscribe(res => this.handlerAfterRequest(res));
            return;
        }
        if (this.type == EAccountModalType.EditRole) {
            if (this.formEditRole.invalid) return;
            this.accountService.put({ id: this.id, roleId: this.formEditRole.value.id })
                .subscribe(res => this.handlerAfterRequest(res));
            return;
        }
        if (this.type == EAccountModalType.Create) {
            if (!this.comparePass()) {
                this.notifyService.showNotifyDanger('Mật khẩu nhập lại không khớp');
                return;
            };
            this.authServerProvider.register({
                username: this.formCreate.value.username,
                password: this.formCreate.value.password,
                role: this.formCreate.value.role
            }).subscribe(res => this.handlerAfterRequest(res), err => {
                this.notifyService.showNotifyDanger('Tên đăng nhập đã có người sử dụng');
                return;
            })
            return;
        }
        if (this.comparePass()) {
            this.authServerProvider.changePassword({
                username: this.username,
                password: this.formChangePassword.value.password
            }).subscribe(res => this.handlerAfterRequest(res));
            return;
        }
        this.notifyService.showNotifyDanger('Mật khẩu nhập lại không khớp');
    }

    handlerAfterRequest(res: any): void {
        if (res.message == 'success') {
            this.activeModal.close('success');
            return;
        }
        this.activeModal.close('faild');
    }

    comparePass(): boolean {
        if (this.type == EAccountModalType.Create) {
            if (this.formCreate.invalid) return false;
            return this.formCreate.value.password === this.formCreate.value.confirmPassword;
        }
        if (this.formChangePassword.invalid) return false;
        return this.formChangePassword.value.password == this.formChangePassword.value.confirmPassword;
    }

    changeRole(id: number): void {
        const role = this.roles.find(role => role.id == id);
        if (this.type == EAccountModalType.Create) {
            this.formCreate.patchValue({ role: role.code })
            return;
        }
        this.formEditRole.setValue(role);
    }
}