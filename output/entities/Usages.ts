import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Computers } from "./Computers";
import { Guests } from "./Guests";

@Index("fk_usage_computer", ["computerId"], {})
@Index("idx_guest_computer", ["guestId", "computerId"], {})
@Entity("usages", { schema: "itpc" })
export class Usages {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "guest_id" })
  guestId: number;

  @Column("int", { name: "computer_id" })
  computerId: number;

  @ManyToOne(() => Computers, (computers) => computers.usages, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "computer_id", referencedColumnName: "id" }])
  computer: Computers;

  @ManyToOne(() => Guests, (guests) => guests.usages, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "guest_id", referencedColumnName: "id" }])
  guest: Guests;
}
