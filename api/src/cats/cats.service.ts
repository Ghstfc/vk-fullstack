import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LikeService } from '../like/like.service';
import { Cat } from '../utils/types';
import { LikeDto } from '../like/entity/like.dto';
import { Like } from '../like/entity/like.entity';

@Injectable()
export class CatsService {
    constructor(
        private readonly httpService: HttpService,
        private readonly likeService: LikeService,
    ) {}

    async searchCats(limit: number = 20): Promise<Cat[]> {
        const response = await firstValueFrom(
            this.httpService.get(`/images/search?limit=${limit}`),
        );
        return response.data.map((cat) => ({
            ...cat,
            favourite: false,
        }));
    }

    async getFavouritesCatsFromApi(user_id: number): Promise<Cat[]> {
        const response = await firstValueFrom(
            this.httpService.get(`/favourites?sub_id=${user_id}`),
        );
        return response.data.map((cat) => ({ ...cat.image, favourite: true }));
    }

    async createFavouriteCatByApi(likeDto: LikeDto): Promise<Like> {
        const response = await firstValueFrom(
            this.httpService.post(`/favourites`, {
                image_id: likeDto.cat_id,
                sub_id: likeDto.user.id.toString(),
            }),
        );
        return await this.likeService.createLike(likeDto, response.data.id);
    }

    async deleteFavouriteCatByApi(likeDto: LikeDto): Promise<void> {
        const like = await this.likeService.findLike(likeDto);
        await firstValueFrom(
            this.httpService.delete(`/favourites/${like.unique_like_id}`),
        );
        return this.likeService.removeLike(likeDto);
    }
}
