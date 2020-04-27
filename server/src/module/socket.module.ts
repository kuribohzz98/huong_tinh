import { Module } from '@nestjs/common';
import { SocketGetway } from './../getway/socket.getway';

@Module({
    providers: [SocketGetway],
    exports: [SocketGetway]
})
export class SocketModule { }
