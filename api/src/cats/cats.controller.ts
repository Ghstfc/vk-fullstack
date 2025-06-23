import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { Cat } from '../utils/types';
import { LikeDto } from '../like/entity/like.dto';

@Controller('/api/cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @UseGuards(AuthGuard)
    @Get('random')
    async getRandomCats(): Promise<Cat[]> {
        return this.catsService.searchCats();
    }

    // ------------------------------------------------------------------------
    //                               API
    // ------------------------------------------------------------------------

    @UseGuards(AuthGuard)
    @Post('favourite')
    async createFavCatByApi(@Body() likeDto: LikeDto, @Req() req: Request) {
        const user = req['user'];
        return this.catsService.createFavouriteCatByApi({
            cat_id: likeDto.cat_id,
            user: user,
        });
    }

    @UseGuards(AuthGuard)
    @Get('favourite')
    async getFavouriteApiCats(@Req() req: Request) {
        const user = req['user'];
        return this.catsService.getFavouritesCatsFromApi(user.id);
    }

    @UseGuards(AuthGuard)
    @Delete('favourite/:id')
    async deleteFavouriteApiCats(
        @Param() params: { id: string },
        @Req() req: Request,
    ) {
        const user = req['user'];
        return this.catsService.deleteFavouriteCatByApi({
            cat_id: params.id,
            user: user,
        });
    }
}
