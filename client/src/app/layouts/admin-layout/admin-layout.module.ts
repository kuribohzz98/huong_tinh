import { ParkingModalComponent } from './../../pages/manager-parking/parking-modal/parking-modal.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { SharedModule } from './../../shared/shared.module';
import { ManagerParkingComponent } from '../../pages/manager-parking/manager-parking.component';
import { ParkingHistoryComponent } from '../../pages/parking-history/parking-history.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    ManagerParkingComponent,
    ParkingHistoryComponent,
    ParkingModalComponent
  ],
  exports: [
    ManagerParkingComponent
  ]
})

export class AdminLayoutModule { }
