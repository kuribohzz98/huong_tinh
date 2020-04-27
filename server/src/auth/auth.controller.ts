import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserLoginDto, UserRegisterDto } from './../dto/user.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    async signUp(@Body() userCreate: UserRegisterDto) {
        const user = await this.authService.signUp(userCreate);
        if (!user) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Account already exists'
            }, 401)
        }
        return {
            message: "success"
        }
    }

    @Post('login')
    async login(@Body() userLogin: UserLoginDto) {
        console.log(userLogin);
        const user = await this.authService.login(userLogin);
        if (!user.access_token) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: user
            }, 401)
        }
        return user;
    }

    @Post('change-password')
    async changePassword(@Body() userLogin: UserLoginDto) {
        const user = await this.authService.changePassword(userLogin);
        if (!user) {
            return { message: 'faild' };
        }
        return { message: 'success' };
    }
}
