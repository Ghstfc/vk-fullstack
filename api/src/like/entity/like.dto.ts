import { User } from '../../user/entity/user.entity';

export type LikeDto = {
    cat_id: string;
    user: User;
};
