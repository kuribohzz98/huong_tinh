import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './../repository/user.repository';
import { UserService } from './../service/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository])
    ],
    providers: [UserService],
    controllers: [],
    exports: [UserService]
})
export class UserModule { }