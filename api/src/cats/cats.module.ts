import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { ConfigService } from '@nestjs/config';
import { LikeModule } from '../like/like.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        AuthModule,
        HttpModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                baseURL: 'https://api.thecatapi.com/v1',
                headers: { 'x-api-key': config.get('CAT_API_KEY') },
                timeout: 5000,
                maxRedirects: 5,
            }),
        }),
        LikeModule,
    ],
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService],
})
export class CatsModule {}
