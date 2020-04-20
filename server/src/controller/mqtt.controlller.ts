import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, MqttContext } from '@nestjs/microservices';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(81, {transports: ['websocket']})
@Controller('mqtt')
export class MqttController {
    private logger = new Logger('MqttController');

    @WebSocketServer()
    server: Server;

    constructor() {}

    @MessagePattern('mai ba/qlx/#')
    positionSubcribe(@Payload() data: any, @Ctx() context: MqttContext) {
        this.logger.log(`Topic: ${context.getTopic()}`);

    }
}