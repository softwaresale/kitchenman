import * as bcrypt from 'bcrypt';
import { Exclude, Expose } from 'class-transformer';
import { Recipe } from '../recipe/recipe.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    firstName: string;

    @Column('text')
    lastName: string;

    @Column('text', { unique: true })
    username: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text')
    @Exclude()
    hash: string;

    @Expose()
    @OneToMany(type => Recipe, recipe => recipe.author)
    recipes: Recipe[];

    @Expose()
    get fullName(): string { return `${this.firstName} ${this.lastName}`; }

    /*
        Set the password. This property converts the given password
        into a salted hash and stores it that way.
     */
    public set password(v: string) {
        const salt = bcrypt.genSaltSync(10);
        this.hash = bcrypt.hashSync(v, salt);
    }

    /**
     * checkPassword: verifies that the given password matches the hash.
     */
    public checkPassword(pass: string): boolean {
        return bcrypt.compareSync(pass, this.hash);
    }
}
