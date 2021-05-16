import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryColumn()
  userName: string;

  @PrimaryColumn()
  purchaseId: string;

  @PrimaryColumn()
  date: string;

  @PrimaryColumn()
  productId: number;

  @Column()
  quantity: number;
}
