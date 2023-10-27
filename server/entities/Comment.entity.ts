import {
    Column,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { CoreEntity } from './Core.entity';

@Entity({
    name: "comment",
})
export class CommentEntity extends CoreEntity {
    @PrimaryGeneratedColumn("increment", { type: "bigint" })
    id: number;

    @Column({ name: "post_id", nullable: false })
    postId: number;

    @Column({ name: "user_id", nullable: false })
    userId: number;

    @Column({ name: "comment", nullable: false })
    comment: string;
}