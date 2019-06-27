import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    /**
     * Creates a new user with basic user info.
     *
     * @param createUser new user data transfer object
     */
    async create(createUser: CreateUserDto): Promise<InsertResult> {
        const newUser = this.userRepo.create({
            username: createUser.username,
            email: createUser.email,
            firstName: createUser.firstName,
            lastName: createUser.lastName,
        });
        newUser.password = createUser.password;
        return this.userRepo.insert(newUser);
    }

    /**
     * Update an existing user. User is queried by id.
     *
     * @param updateUser update user data transfer object
     */
    async update(id: string, updateUser: UpdateUserDto): Promise<UpdateResult> {
        // TODO check that user is in database
        return this.userRepo.update({ id }, updateUser);
    }

    /**
     * Deletes a certain user by id
     *
     * @param id User to delete
     */
    async deleteId(id: string): Promise<DeleteResult> {
        // TODO check that user is in database
        return this.userRepo.delete({ id });
    }

    /**
     * Deletes a certain user based off of it's object
     *
     * @param user user object to delete
     */
    async deleteUser(user: User): Promise<DeleteResult> {
        return this.deleteId(user.id);
    }

    /**
     * Get all user objects
     */
    async findAll(): Promise<User[]> {
        return this.userRepo.find({ relations: ['recipes'] });
    }

    /**
     * Request a user based on its id
     *
     * @param id ID of requested user
     */
    async findById(id: string): Promise<User> {
        return this.userRepo.findOne({ id }, { relations: ['recipes'] });
    }

    /**
     * Finds a user by credentials. If the credentials match, then
     * return the user.
     *
     * @param username username of queried user
     * @param pass plaintext password for user
     */
    async findByCredentials(username: string, pass: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.userRepo.find({ where: { username }, relations: ['recipes']}).then(users => {
                const user = users[0];
                if (user.checkPassword(pass)) {
                    resolve(user);
                } else {
                    reject('Passwords did not match');
                }
            }).catch(err => {
                reject('User could not be found');
            });
        });
    }
}
