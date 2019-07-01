
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';

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
