import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvidersConfig } from './config/provider';
import Modules from './module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
    ConfigModule,
    AuthModule,
    ...Modules
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...ProvidersConfig
  ],
})
export class AppModule { }
