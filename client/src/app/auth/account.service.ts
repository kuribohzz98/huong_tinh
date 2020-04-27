import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IUser, IUserPage } from './../shared/models/user.model';
import { StorageService } from './../shared/service/storage.service';
import { KeySessionStorage } from '../constants/storage.constants';
import { BaseService } from '../service/base.service';
import { UserRole } from './../constants/auth.constants';

@Injectable({ providedIn: 'root' })
export class AccountService extends BaseService<IUser, IUserPage> {
  path_url: string = '/user';
  private _userIdentity: IUser | null = null;
  private accountCache$?: Observable<IUser | null>;

  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly _http: HttpClient
  ) {
    super(_http);
  }

  authenticate(identity: IUser | null): void {
    this._userIdentity = identity;
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (!this._userIdentity || !this._userIdentity.role) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return authorities.includes(this._userIdentity.role);
  }

  get userIdentity(): IUser | null {
    return this._userIdentity;
  }

  identity(force?: boolean): Observable<IUser | null> {
    if (!this.accountCache$ || force || !this.isAuthenticated()) {
      const idUser = this.storageService.getItemSession(KeySessionStorage.userId);
      if (!idUser) return of(null);
      if (this._userIdentity) return of(this._userIdentity);
      this.accountCache$ = this.fetch(+idUser).pipe(
        catchError(() => {
          return of(null);
        }),
        tap((account: IUser | null) => {
          this.authenticate(account);
        }),
      );
    }
    return this.accountCache$;
  }

  isAuthenticated(): boolean {
    return this._userIdentity !== null && !!this._userIdentity.role;
  }

  isAdmin(): boolean {
    return this._userIdentity !== null && !!this._userIdentity.role && this._userIdentity.role == UserRole.ADMIN;
  }

  private fetch(id: number): Observable<IUser> {
    return this._http.get<IUser>(this.url + `/${id}`);
  }

  getRoles(): Observable<any> {
    return this._http.get<any>(this.url + '/get-role/all');
  }
}
