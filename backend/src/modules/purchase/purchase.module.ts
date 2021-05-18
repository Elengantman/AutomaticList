import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseController } from "./purchase.controller";
import { Purchase } from './purchase.entity';
import { Product } from '../product/product.entity';
import { MyList } from '../my-list/my-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Product, MyList])],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
