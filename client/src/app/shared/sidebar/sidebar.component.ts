import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserRole } from './../../constants/auth.constants';
import { AccountService } from './../../auth/account.service';
import { AuthServerProvider } from './../../auth/auth-jwt.service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    isLogout?: boolean;
    roles?: string[];
}

export const ROUTES: RouteInfo[] = [
    { path: '/manager/manager-parking', title: 'Hầm để xe', icon: 'nc-istanbul', class: '', roles: [UserRole.ADMIN, UserRole.MANAGER] },
    { path: '/manager/parking-history', title: 'Lịch sử đỗ', icon: 'nc-book-bookmark', class: '', roles: [UserRole.ADMIN, UserRole.MANAGER] },
    { path: '/manager/account', title: 'Quản lý tài khoản', icon: 'nc-single-02', class: '', roles: [UserRole.ADMIN] },
    { path: '/logout', title: 'Đăng xuất', icon: '', class: 'logout', isLogout: true }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    constructor(
        private readonly router: Router,
        private readonly authServerProvider: AuthServerProvider,
        private readonly accountService: AccountService
    ) { }
    ngOnInit(): void {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    acceptView(roles?: string[]): boolean {
        if (!roles) return true;
        return this.accountService.hasAnyAuthority(roles);
    }

    logout(): void {
        this.authServerProvider.logout();
        this.router.navigate(['']);
    }
}
