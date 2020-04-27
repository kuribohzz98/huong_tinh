import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountModalComponent } from './account-modal/account-modal.component';
import { AccountComponent } from './account.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        AccountComponent,
        AccountModalComponent
    ],
    exports: [AccountModalComponent, AccountComponent]
})

export class AccountModule { }
