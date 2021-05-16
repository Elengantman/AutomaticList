import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseController } from "./purchase.controller";
import { Purchase } from './purchase.entity';
import { Product } from '../product/product.entity';
import { MyList } from '../my-list/my-list.entity';
import { Recommend } from '../recommend/recommend.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Product, MyList, Recommend])],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
