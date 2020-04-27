import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';
import io from 'socket.io-client';
import { environment } from './../../../environments/environment.prod';
import { ESocketChannel } from '../../constants/common.constants';

@Injectable({ providedIn: 'root' })
export class SocketService {
    private _socket: any;

    constructor() {
        this._socket = io(environment.host);
    }

    watchChannel(channel: ESocketChannel): Observable<any> {
        const subject$ = new Subject<any>();
        this._socket.on(channel, data => subject$.next(data));
        return subject$.asObservable();
    }

    emitMessage(channel: string, data: any): void {
        this._socket.emit(channel, data);
    }

}