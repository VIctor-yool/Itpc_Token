import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Usages } from "src/usages/entities/usage.entity";
  
  @Index("name", ["name"], { unique: true })
  @Entity("guests", { schema: "itpc" })
  export class Guests {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;
  
    @Column("varchar", { name: "name", unique: true, length: 255 })
    name: string;
  
    @Column("varchar", { name: "password", length: 255 })
    password: string;
  
    @Column("int", { name: "age" })
    age: number;
  
    @OneToMany(() => Usages, (usages) => usages.guest)
    usages: Usages[];
  }
  