import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Put, UseGuards, UseInterceptors, ValidationPipe, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RecipeCreateDto } from '../dto/recipe-create.dto';
import { RecipeUpdateDto } from '../dto/recipe-update.dto';
import { AuthUser } from '../user/auth-user.decorator';
import { User } from '../user/user.entity';
import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { Recipe } from './recipe.entity';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {

    constructor(
        private readonly recipeService: RecipeService,
    ) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    async getForUser(@AuthUser() user: User): Promise<Recipe[]> {
        return this.recipeService.findAllForUser(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/')
    async create(
        @AuthUser() author: User,
        @Body(new ValidationPipe()) createRecipe: RecipeCreateDto,
    ): Promise<Recipe> {
        console.log('Create dto from controller');
        console.log(createRecipe);
        return this.recipeService.create(author, createRecipe);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    async getIdForUser(@AuthUser() user: User, @Param('id') id: string): Promise<Recipe> {
        return this.recipeService.findIdForUser(user, id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id')
    async update(
        @AuthUser() user: User,
        @Param('id') id: string,
        @Body() updateRecipe: RecipeUpdateDto,
    ): Promise<UpdateResult> {
        return this.recipeService.update(id, updateRecipe);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    async delete(
        @AuthUser() user: User,
        @Param('id') id: string,
    ): Promise<DeleteResult> {
        return this.recipeService.delete(id);
    }
}
