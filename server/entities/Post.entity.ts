import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

import { CoreEntity } from "./Core.entity";
import { PostActivationStatus } from "types";

@Entity({
  name: "post",
})

export class PostEntity extends CoreEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column({ name: "title", nullable: true })
  title: string;

  @Column({ name: "body", nullable: true })
  body: string;

  @Column({ name: "user_id", nullable: true })
  user_id: number;

  @Column({ name: "status", default: 0 })
  status?: number;

  @Column({ name: "attachments", nullable: true })
  attachments?: string;
}
