import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './entity/user.dto';

@Controller('/api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async register(
        @Body() createUserDto: CreateUserDto,
    ): Promise<{ login: string }> {
        return {
            login: (await this.userService.createUser(createUserDto)).login,
        };
    }
}
