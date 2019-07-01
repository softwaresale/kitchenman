import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Put, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateUserDto } from '../dto/user-update.dto';
import { AuthUser } from './auth-user.decorator';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    /*
        User creation is handled under the auth controller
     */
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async findById(@AuthUser() user: User): Promise<User> {
        return user;
    }

    @Put('me')
    @UseGuards(AuthGuard('jwt'))
    async updateUser(
        @AuthUser('id') id: string,
        @Body(new ValidationPipe()) body: UpdateUserDto,
    ): Promise<UpdateResult> {
        return this.userService.update(id, body);
    }

    @Delete('me')
    @UseGuards(AuthGuard('jwt'))
    async deleteUser(@AuthUser() user: User): Promise<DeleteResult> {
        return this.userService.deleteUser(user);
    }
}
