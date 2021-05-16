import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyListController } from "./my-list.controller";
import { MyList } from './my-list.entity';
import { Product } from '../product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MyList, Product])],
  controllers: [MyListController],
})
export class MyListModule {}
