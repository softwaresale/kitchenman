import { Controller, UseInterceptors, ClassSerializerInterceptor, UseGuards, Get, Param, Post, Body, Put } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/user/auth-user.decorator';
import { User } from 'src/user/user.entity';
import { Recipe } from './recipe.entity';
import { RecipeCreateDto, RecipeUpdateDto } from 'src/dto/recipe.dto';
import { InsertResult, UpdateResult } from 'typeorm';

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
        @Body() createRecipe: RecipeCreateDto,
    ): Promise<InsertResult> {
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
}
