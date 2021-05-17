import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Department {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  expDays: number;
}
