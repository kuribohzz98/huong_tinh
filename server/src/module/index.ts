import { SocketModule } from './socket.module';
import { UserModule } from './user.module';
import { ParkingModule } from './parking.module';
import { MqttModule } from './mqtt.module';

const Modules = [
    ParkingModule,
    MqttModule,
    UserModule,
    SocketModule
];

export default Modules;