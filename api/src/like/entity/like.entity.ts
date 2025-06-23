import {
    Entity,
    CreateDateColumn,
    PrimaryColumn,
    ManyToOne,
    Unique,
    Column,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
@Unique(['cat_id', 'user'])
export class Like {
    @PrimaryColumn()
    cat_id: string;

    @ManyToOne(() => User, (user) => user.likes)
    user: User;

    @Column({ unique: true })
    unique_like_id: number;

    @CreateDateColumn()
    createdAt: Date;
}
