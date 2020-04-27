import { NotifyService } from './../../../shared/service/notify.service';
import { Router } from '@angular/router';
import { AuthServerProvider } from './../../auth-jwt.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html'
})
export class LoginModalComponent implements OnInit {
    @Input() name;

    loginFrom: FormGroup;
    
    constructor(
        public activeModal: NgbActiveModal,
        private readonly authServerProvider: AuthServerProvider,
        private readonly fb: FormBuilder,
        private readonly router: Router,
        private readonly notifyService: NotifyService
    ) { }


    ngOnInit(): void {
        this.loginFrom = this.fb.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        })
    }

    onSubmit(): void {
        if (this.loginFrom.invalid) return;
        this.authServerProvider.login(this.loginFrom.value).subscribe(res => {
            this.notifyService.showNotifySuccess('Đăng nhập thành công');
            this.activeModal.close('Close click')
            this.router.navigate(['/manager']);
        }, err => {
            this.notifyService.showNotifyDanger('Tên đăng nhập hoặc mật khẩu không chính xác');
        })
    }
}