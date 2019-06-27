import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Ingredient } from 'src/interfaces/ingredient.interface';
import { Transform, Expose } from 'class-transformer';

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
