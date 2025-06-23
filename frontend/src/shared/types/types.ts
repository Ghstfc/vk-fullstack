export interface UserDto {
    login: string,
    password: string,
}

export interface User {
    login: string,
}

export interface LikeDto {
    cat_id: string,
}

export interface Cat {
    id: string;
    url: string;
    favourite: boolean;
}

