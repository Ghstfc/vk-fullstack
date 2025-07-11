import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './user/entity/user.entity';
import { Like } from './like/entity/like.entity';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Like],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
});
