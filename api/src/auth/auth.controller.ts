import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    Res,
    Get,
    UseGuards,
    Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('/api/auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(
        @Body() signInDto: AuthDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<{ id: number; login: string }> {
        const { accessToken, login, id } = await this.authService.signIn(
            signInDto.login,
            signInDto.password,
        );

        response.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: this.configService.get<string>('NODE_ENV') === 'production',
            sameSite: 'strict',
            maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
        });

        return { login, id };
    }

    @UseGuards(AuthGuard)
    @Get('refresh')
    async getCurrentUser(@Req() request: Request): Promise<{ login: string }> {
        const user = request['user'];

        return { login: user.login };
    }
}
