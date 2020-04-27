import { AdminLayoutModule } from './../admin-layout/admin-layout.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GuestLayoutRoutes } from './guest-layout.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GuestLayoutRoutes),
    FormsModule,
    NgbModule,
    AdminLayoutModule
  ],
  declarations: [
  ]
})

export class GuestLayoutModule { }
