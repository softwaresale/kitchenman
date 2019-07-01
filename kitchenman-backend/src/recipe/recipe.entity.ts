import { Expose } from 'class-transformer';
import { Ingredient } from '../interfaces/ingredient.interface';
import { User } from '../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    name: string;

    @Column('text')
    description: string;

    @Expose()
    @ManyToOne(type => User, user => user.recipes)
    author: User;

    @Column('simple-json')
    directions: string[];

    @Column('simple-json')
    ingredients: Ingredient[];
}
