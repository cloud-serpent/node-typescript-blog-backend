import { 
  Column, 
  Entity, 
  Generated, 
  PrimaryGeneratedColumn,
} from "typeorm";

import { CoreEntity } from "./Core.entity";
import { UserActivationStatus } from "types";

@Entity({
  name: "user",
})
export class UserEntity extends CoreEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: "display_name", nullable: true })
  display_name?: string;

  @Column({ name: "password", select: false })
  password: string;

  @Column({ name: "role", default: 0 })
  role: number;

  @Column({ name: "country_code", nullable: true })
  country_code?: string;

  @Column({ name: "phone_number", nullable: true })
  phone_number?: string;

  @Column({ name: "email", nullable: true })
  email?: string;

<<<<<<< HEAD
  @Column({ name: "password", select: false })
  password: string;

  @Column({ name: "role", default: 0 })
  role: number;

  @Column({ name: "activated", default: 0 })
  activated: UserActivationStatus;

  @Column({name: 'avatar', nullable: true})
  avatar?: string;
=======
  @Column({ name: "display_name", nullable: true })
  displayName?: string;

  @Column({ name: "avatar", nullable: true })
  avatar?: string;

  @Column({ name: "activated", default: 0 })
  activated: UserActivationStatus;
>>>>>>> 6a834aec45ab33d3e79c09884881976d4f648f1b
}
