import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class MyList {
  @PrimaryColumn()
  userName: string;

  @PrimaryColumn()
  productId: number;
}
