import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async genToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      id: user.id,
    };
    return this.jwtService.signAsync(payload);
  }

  async signInUser(username: string, password: string): Promise<User> {
    return this.userService.findByCredentials(username, password);
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return await this.userService.findById(payload.id);
  }
}
