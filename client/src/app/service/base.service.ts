import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';

type Object = {
    [key: string]: any;
}

export type ResponseMessage = {
    message: string;
}

@Injectable({ providedIn: 'root' })
export abstract class BaseService<T extends Object = any, U extends Object = any> {
    abstract path_url: string;

    constructor(public http: HttpClient) { }

    get url(): string {
        return environment.host + environment.serverUrl + this.path_url;
    }

    get(data?: U): Observable<[T[], number]> {
        return this.http.get<[T[], number]>(this.url, { params: data });
    }

    getOne(id: number): Observable<T> {
        return this.http.get<T>(this.url + `/${id}`);
    }

    post(data: T): Observable<ResponseMessage> {
        return this.http.post<ResponseMessage>(this.url, data);
    }

    put(data: T): Observable<ResponseMessage> {
        return this.http.put<ResponseMessage>(this.url, data);
    }

    delete(id: number): Observable<ResponseMessage> {
        return this.http.delete<ResponseMessage>(this.url + `/${id}`);
    }
}