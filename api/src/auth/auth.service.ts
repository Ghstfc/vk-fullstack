import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async signIn(
        login: string,
        password: string,
    ): Promise<{ accessToken: string; id: number; login: string }> {
        const user = await this.usersService.findUserByLoginAndPassword({
            login,
            password,
        });

        const payload = { id: user.id, login: user.login };
        return {
            accessToken: await this.jwtService.signAsync(payload),
            id: user.id,
            login: login,
        };
    }
}
