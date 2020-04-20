import { UserModule } from './user.module';
import { EventsModule } from './event.module';
import { ParkingModule } from './parking.module';
import { MqttModule } from './mqtt.module';

const Modules = [
    ParkingModule,
    MqttModule,
    UserModule
    // EventsModule
];

export default Modules;