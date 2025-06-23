import { IsAlpha, Length } from 'class-validator';

export class CreateUserDto {
    @IsAlpha('en-US', {
        message: 'Логин должен содержать только латиницу',
    })
    @Length(5, 20, { message: 'Логин должен быть от 5 до 20 символов' })
    login: string;

    @Length(8, 30, { message: 'Пароль должен быть от 8 до 30 символов' })
    password: string;
}
