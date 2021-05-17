import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendController } from "./recommend.controller";
import { Recommend } from './recommend.entity';
import { Product } from '../product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recommend, Product])],
  controllers: [RecommendController],
})
export class RecommendModule {}
