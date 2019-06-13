import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Ingredient } from 'src/interfaces/ingredient.interface';

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { unique: true })
    name: string;

    @Column('text')
    description: string;

    @ManyToOne(type => User, user => user.recipes)
    author: User;

    @Column('simple-json')
    directions: {
        steps: string[];
    };

    @Column('simple-json')
    ingredients: Ingredient[];
}
