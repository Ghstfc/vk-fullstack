import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { likeProviders } from './entity/like.provider';
import { LikeService } from './like.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    providers: [...likeProviders, LikeService],
    exports: [LikeService],
})
export class LikeModule {}
