import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { Recipe } from './recipe.entity';
import { RecipeCreateDto, RecipeUpdateDto } from 'src/dto/recipe.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private readonly recipeRepo: Repository<Recipe>,
        private readonly userService: UserService,
    ) { }

    async create(author: User, recipeCreate: RecipeCreateDto): Promise<InsertResult> {
        if (!recipeCreate.author) {
            recipeCreate.author = author;
        }

        return this.recipeRepo.insert(recipeCreate);
    }

    async update(id: string, recipeUpdate: RecipeUpdateDto): Promise<UpdateResult> {
        return this.recipeRepo.update({id}, recipeUpdate);
    }

    async delete(id: string): Promise<DeleteResult> {
        return this.recipeRepo.delete({id});
    }

    async findAll(): Promise<Recipe[]> {
        return this.recipeRepo.find({relations: ['author']});
    }

    async findAllForUser(author: User): Promise<Recipe[]> {
        return this.recipeRepo.find({where: {author}, relations: ['author']});
    }

    async findById(id: string): Promise<Recipe> {
        return this.recipeRepo.findOne({ id }, {relations: ['author']});
    }

    async findIdForUser(author: User, id: string): Promise<Recipe> {
        return this.recipeRepo.findOne({ author, id }, {relations: ['author']});
    }
}
