import { Injectable } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
@Injectable()
export class SocketGetway {

    @WebSocketServer()
    public server: Server;

    @SubscribeMessage('hihi')
    handleEvent(@MessageBody() data: string): string {
        console.log(data);
        return data;
    }
}