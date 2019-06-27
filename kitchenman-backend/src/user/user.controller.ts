import { Controller, Get, Req, Param, Put, Body, Delete, ParseIntPipe, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from './auth-user.decorator';
import { UpdateUserDto } from 'src/dto/user.dto';

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
        @Body() body: UpdateUserDto,
    ): Promise<UpdateResult> {
        return this.userService.update(id, body);
    }

    @Delete('me')
    @UseGuards(AuthGuard('jwt'))
    async deleteUser(@AuthUser() user: User): Promise<DeleteResult> {
        return this.userService.deleteUser(user);
    }
}
