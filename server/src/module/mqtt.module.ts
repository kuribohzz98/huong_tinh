import { Module } from '@nestjs/common';
import { MqttController } from './../controller/mqtt.controlller';
import { SocketModule } from './socket.module';
import { ParkingModule } from './parking.module';

@Module({
  imports: [
    SocketModule,
    ParkingModule
  ],
  controllers: [MqttController],
  providers: [
  ],
})
export class MqttModule {}
