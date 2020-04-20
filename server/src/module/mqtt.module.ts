import { Module } from '@nestjs/common';
import { MqttController } from './../controller/mqtt.controlller';

@Module({
  imports: [
  ],
  controllers: [MqttController],
  providers: [
  ],
})
export class MqttModule {}
