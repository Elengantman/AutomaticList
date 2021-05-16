import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Recommend {
  @PrimaryColumn()
  userName: string;

  @PrimaryColumn()
  productId: number;

  @Column()
  startDate: string;

  @Column()
  purchaseCount: number;

  @Column()
  totalQuantity: number;

  @Column()
  nextDate: string;

  @Column()
  nextQuantity: number;
}
