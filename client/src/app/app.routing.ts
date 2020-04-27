import { UserRouteAccessService } from './auth/user-route-access-service';
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { UserRole } from './constants/auth.constants';

export const AppRoutes: Routes = [
  {
    path: '',
    component: GuestLayoutComponent,
    loadChildren: () => import('./layouts/guest-layout/guest-layout.module').then(m => m.GuestLayoutModule)
  },
  {
    path: 'manager',
    component: AdminLayoutComponent,
    data: {
      authorities: [UserRole.ADMIN, UserRole.MANAGER]
    },
    canActivate: [UserRouteAccessService],
    loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]
