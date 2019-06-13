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

  async signIn(username: string, password: string): Promise<string> {
    return this.userService.findByCredentials(username, password).then(user => {
      const payload: JwtPayload = {
        id: user.id,
      };
      return this.jwtService.signAsync(payload);
    }).catch(error => {
      return error;
    });
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return await this.userService.findById(payload.id);
  }
}
