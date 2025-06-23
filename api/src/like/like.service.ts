import {
    ConflictException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Like } from './entity/like.entity';
import { LikeDto } from './entity/like.dto';

@Injectable()
export class LikeService {
    constructor(
        @Inject('LIKE_REPOSITORY')
        private likeRepository: Repository<Like>,
    ) {}

    async findLike(likeDto: LikeDto): Promise<Like> {
        return await this.likeRepository.findOne({
            where: {
                cat_id: likeDto.cat_id,
                user: { id: likeDto.user.id },
            },
        });
    }

    async createLike(likeDto: LikeDto, unique_id: number): Promise<Like> {
        const existingLike = await this.findLike(likeDto);
        if (existingLike) {
            throw new ConflictException('Вы уже ставили лайк данному коту');
        }

        const like = this.likeRepository.create({
            cat_id: likeDto.cat_id,
            user: likeDto.user,
            unique_like_id: unique_id,
        });
        return this.likeRepository.save(like);
    }

    async removeLike(likeDto: LikeDto): Promise<void> {
        const like = await this.findLike(likeDto);

        if (!like) {
            throw new NotFoundException('Вы не лайкали этого кота!');
        }

        await this.likeRepository.remove(like);
    }
}
