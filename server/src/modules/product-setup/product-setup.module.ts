import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSetupController } from "./product-setup.controller";
import { Product } from '../product/product.entity';
import { Department } from '../department/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Department])],
  controllers: [ProductSetupController],
})
export class ProductSetupModule {}
