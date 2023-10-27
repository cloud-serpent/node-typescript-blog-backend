import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

import { CoreEntity } from "./Core.entity";
import { UserActivationStatus } from "types";

@Entity({
  name: "user",
})
export class UserEntity extends CoreEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column({ name: "display_name", nullable: true })
  displayName?: string;

  @Column({ name: "password", select: false })
  password: string;

  @Column({ name: "role", default: 0 })
  role: number;

  @Column({ name: "country_code", nullable: true })
  countryCode?: string;

  @Column({ name: "phone_number", nullable: true })
  phoneNumber?: string;

  @Column({ name: "email", nullable: true })
  email?: string;

  @Column({ name: "avatar", nullable: true })
  avatar?: string;

  @Column({ name: "activated", default: 0 })
  activated: number;
}
