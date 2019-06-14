
import { BasicStrategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class HttpStrategy extends PassportStrategy(BasicStrategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<User> {
        const user = this.authService.signInUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
