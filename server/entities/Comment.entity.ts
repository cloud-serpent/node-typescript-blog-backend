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
    post_id: number;

    @Column({ name: "user_id", nullable: false })
    user_id: number;

    @Column({ name: "body", nullable: false })
    body: string;
}