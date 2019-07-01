import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../dto/user-create.dto';
import { AuthUser } from '../user/auth-user.decorator';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

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
    async signup(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<string> {
        const result = await this.userService.create(createUserDto);
        const user = await this.userService.findById(result.generatedMaps[0].id);
        return this.authService.genToken(user);
    }
}
