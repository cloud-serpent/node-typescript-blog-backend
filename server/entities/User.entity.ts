import { Column, Entity, Generated } from "typeorm";

import { CoreEntity } from "./Core.entity";

@Entity({
  name: "user",
})
export class UserEntity extends CoreEntity {
  @Column({ name: "first_name", nullable: true })
  first_name?: string;

  @Column({ name: "last_name", nullable: true })
  last_name?: string;

  @Column({ name: "email", nullable: true })
  email?: string;

  @Column({ name: "password", select: false })
  password: string;

  @Column({ name: "role", default: 0 })
  role: number;
}
