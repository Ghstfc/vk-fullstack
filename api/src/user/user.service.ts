import {
    Injectable,
    Inject,
    ConflictException,
    NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './entity/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}

    async findByLogin(login: string): Promise<User | null> {
        return await this.userRepository.findOneBy({ login });
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.findByLogin(createUserDto.login);

        if (existingUser) {
            throw new ConflictException('Логин уже занят');
        }

        const saltOrRounds = 10;

        const hashedPassword = await bcrypt.hash(
            createUserDto.password,
            saltOrRounds,
        );

        const user = this.userRepository.create({
            login: createUserDto.login,
            password: hashedPassword,
        });

        return this.userRepository.save(user);
    }

    async findUserByLoginAndPassword(
        createUserDto: CreateUserDto,
    ): Promise<User> {
        const user = await this.findByLogin(createUserDto.login);

        if (!user) {
            throw new NotFoundException('Неправильный логин или пароль');
        }

        const isValid = await bcrypt.compare(
            createUserDto.password,
            user.password,
        );

        if (!isValid) {
            throw new NotFoundException('Неправильный логин или пароль');
        }
        return user;
    }
}
