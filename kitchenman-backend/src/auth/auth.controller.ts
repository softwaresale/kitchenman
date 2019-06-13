import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { InsertResult, ObjectLiteral } from 'typeorm';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @Post('login')
    async login(
        @Body('username') username: string,
        @Body('password') password: string,
    ): Promise<string> {
        return this.authService.signIn(username, password);
    }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<string> {
        const result = await this.userService.create(createUserDto);
        return this.authService.signIn(createUserDto.username, createUserDto.password);
    }
}
