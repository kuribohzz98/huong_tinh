import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from './login-moal/login-modal.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    constructor(private readonly modalService: NgbModal) { }

    ngOnInit() { }
    
    open() {
        const modalRef = this.modalService.open(LoginModalComponent);
    }
}
