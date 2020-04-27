import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, MqttContext } from '@nestjs/microservices';
import { SocketGetway } from './../getway/socket.getway';
import { ParkingService } from './../service/parking.service';
import { ESocketChannel } from './../constants/common.constants';

@Controller('Mqtt')
export class MqttController {
    private logger = new Logger('MqttController');

    constructor(
        private readonly socketGetway: SocketGetway,
        private readonly parkingService: ParkingService
    ) { }

    @MessagePattern('mai ba/qlx/#')
    async positionSubcribe(@Payload() data: string, @Ctx() context: MqttContext) {
        const topic = context.getTopic().split('/').pop();
        const status = data == 'yes';
        this.logger.log(`Topic: ${topic[topic.length - 1]}, Data: ${data}`);
        const isChange = await this.parkingService.topicChange(+topic[topic.length - 1], status);
        if (isChange) this.socketGetway.server.emit(ESocketChannel.HasChange, +topic[topic.length - 1]);
        return;
    }

}