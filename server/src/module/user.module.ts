import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './../repository/user.repository';
import { UserService } from './../service/user.service';
import { UserController } from './../controller/user.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository])
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }
