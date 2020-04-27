import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { initSwagger } from './swagger/swagger';
import * as helmet from 'helmet';
import { Providers } from './constants/provider.constants';

function initMqttMicroservice(app: INestApplication) {
  const mqttUrl = app.get(Providers.MqttUrl);
  const mqttUsername = app.get(Providers.MqttUsername);
  const mqttPass = app.get(Providers.MqttPass);

  const mqttApp = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: `mqtt://${mqttUrl}`,
      username: mqttUsername,
      password: mqttPass
    }
  });
  mqttApp.listen(() => console.log(`Microservice is listening at ${mqttUrl}`));
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/huong');
  app.use(helmet());
  app.enableCors();
  initSwagger(app);
  app.listen(app.get(Providers.Port));
  initMqttMicroservice(app);
}
bootstrap();
