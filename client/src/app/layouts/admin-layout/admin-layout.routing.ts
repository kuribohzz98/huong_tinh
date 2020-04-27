import { Routes } from '@angular/router';

import { AccountComponent } from './../../pages/account/account.component';
import { ManagerParkingComponent } from '../../pages/manager-parking/manager-parking.component';
import { ParkingHistoryComponent } from '../../pages/parking-history/parking-history.component';
import { UserRouteAccessService } from './../../auth/user-route-access-service';
import { UserRole } from './../../constants/auth.constants';

export const AdminLayoutRoutes: Routes = [
    {
        path: '',
        redirectTo: 'manager-parking',
    },
    {
        path: 'account',
        canActivate: [UserRouteAccessService],
        data: {
            authorities: [UserRole.ADMIN]
        },
        component: AccountComponent
    },
    { path: 'manager-parking', component: ManagerParkingComponent },
    { path: 'parking-history', component: ParkingHistoryComponent }
];
