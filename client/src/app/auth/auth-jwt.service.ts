import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from '../service/base.service';
import { StorageService } from './../shared/service/storage.service';
import { Login, IUser, JwtToken } from '../shared/models/user.model';
import { KeySessionStorage } from '../constants/storage.constants';
import { ResponseMessage } from './../service/base.service';
import { AccountService } from './account.service';

@Injectable({ providedIn: 'root' })
export class AuthServerProvider extends BaseService {
  path_url: string = '/auth';
  constructor(
    private readonly storageService: StorageService,
    private readonly _http: HttpClient,
    private readonly accountService: AccountService
  ) {
    super(_http)
  }

  getToken(): string {
    return this.storageService.getItemSession(KeySessionStorage.authenticationToken) || '';
  }

  login(credentials: Login): Observable<IUser> {
    return this._http
      .post<JwtToken>(this.url + '/login', credentials)
      .pipe(map(response => this.authenticateSuccess(response)));
  }

  logout(): void {
    this.storageService.removeItemSession(KeySessionStorage.authenticationToken);
    this.storageService.removeItemSession(KeySessionStorage.userId);
    this.accountService.authenticate(null);
  }

  changePassword(data: Login): Observable<ResponseMessage> {
    return this._http.post<ResponseMessage>(this.url + '/change-password', data);
  }

  register(data: Login): Observable<ResponseMessage> {
    return this._http.post<ResponseMessage>(this.url + '/register', data);
  }

  private authenticateSuccess(response: JwtToken): IUser {
    console.log(response.user);
    if (!response) return;
    const jwt = response.access_token;
    this.storageService.setItemSession(KeySessionStorage.authenticationToken, jwt);
    this.storageService.setItemSession(KeySessionStorage.userId, response.user.id + '');
    return response.user;
  }
}
