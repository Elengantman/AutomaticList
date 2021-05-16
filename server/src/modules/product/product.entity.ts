import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Department } from "../department/department.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  departmentId: number;
}
