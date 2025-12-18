import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usages } from "./Usages";

@Entity("computers", { schema: "itpc" })
export class Computers {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "spec", length: 255 })
  spec: string;

  @Column("int", { name: "price" })
  price: number;

  @Column("enum", {
    name: "status",
    enum: ["양호", "고장", "수리중"],
    default: () => "'양호'",
  })
  status: "양호" | "고장" | "수리중";

  @OneToMany(() => Usages, (usages) => usages.computer)
  usages: Usages[];
}
