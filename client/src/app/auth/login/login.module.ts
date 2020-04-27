import { LoginModalComponent } from './login-moal/login-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent,
        LoginModalComponent
    ],
    exports: [LoginComponent]
})

export class LoginModule { }
