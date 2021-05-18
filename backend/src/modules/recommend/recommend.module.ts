import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendController } from "./recommend.controller";
import { Product } from '../product/product.entity';
import { MyList } from '../my-list/my-list.entity';
import { Purchase } from '../purchase/purchase.entity';
import { Department } from '../department/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Product, MyList, Purchase])],
  controllers: [RecommendController],
})
export class RecommendModule {}
