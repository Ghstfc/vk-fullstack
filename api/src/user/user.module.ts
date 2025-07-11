import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './entity/user.provider';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [DatabaseModule],
    providers: [...userProviders, UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
