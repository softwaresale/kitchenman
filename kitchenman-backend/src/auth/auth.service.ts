import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';

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
