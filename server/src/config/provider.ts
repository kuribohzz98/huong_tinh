import { Provider } from "@nestjs/common";
import { ConfigService } from './config.service';
import { Providers } from './../constants/provider.constants';

export const ProvidersConfig: Provider<any>[] = [
    {
        provide: Providers.MqttUrl,
        useFactory: (configService: ConfigService) => {
            return `${configService.get('MQTT_HOST')}:${configService.get('MQTT_PORT')}`;
        },
        inject: [ConfigService]
    },
    {
        provide: Providers.MqttUsername,
        useFactory: (configService: ConfigService) => {
            return configService.get('MQTT_USERNAME');
        },
        inject: [ConfigService]
    },
    {
        provide: Providers.MqttPass,
        useFactory: (configService: ConfigService) => {
            return configService.get('MQTT_PASSWORD');
        },
        inject: [ConfigService]
    },
    {
        provide: Providers.Port,
        useFactory: (configService: ConfigService) => {
            return configService.get('PORT_LISTEN');
        },
        inject: [ConfigService]
    }
]