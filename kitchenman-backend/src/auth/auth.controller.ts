import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { InsertResult, ObjectLiteral } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/user/auth-user.decorator';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @Post('login')
    @UseGuards(AuthGuard('basic'))
    async login(@AuthUser() user: User): Promise<string> {
        return this.authService.genToken(user);
    }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<string> {
        const result = await this.userService.create(createUserDto);
        const user = await this.userService.findById(result.generatedMaps[0].id);
        return this.authService.genToken(user);
    }
}
