import { Controller, Get, Req, Param, Put, Body, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) { }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    /*
        User creation is handled under the auth controller
     */
    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async findById(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
        return this.userService.findById(id);
    }

    @Put(':id')
    async updateUser(@Param('id', new ParseIntPipe()) id: number, @Body() body): Promise<UpdateResult> {
        return this.userService.update(id, body);
    }

    @Delete(':id')
    async deleteUser(@Param('id', new ParseIntPipe()) id: number): Promise<DeleteResult> {
        return this.userService.delete(id);
    }

    /* Need to add granular API routes here */
}
