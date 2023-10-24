import { Column, Entity, Generated } from "typeorm";

import { CoreEntity } from "./Core.entity";

@Entity({
  name: "user",
})
export class UserEntity extends CoreEntity {
  @Column({ name: "first_name", nullable: true })
  firstname?: string;

  @Column({ name: "last_name", nullable: true })
  lastname?: string;

  @Column({ name: "email", nullable: true })
  email?: string;

  @Column({ name: "password", select: false })
  password: string;

  @Column({ name: "role", default: 0 })
  role: number;

  @Column({ name: "country_code", nullable: true })
  countryCode?: string;

  @Column({ name: "phone_number", nullable: true })
  phoneNumber?: string;

  @Column({ name: "display_name", nullable: true })
  displayName?: string;

  @Column({ name: "avatar", nullable: true })
  avatar?: string;

  @Column({ name: "notification_setting", length: 3 })
  notificationSetting: string;
}
