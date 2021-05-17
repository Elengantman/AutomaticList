import { Controller, Get, Param } from '@nestjs/common';
import { BaseController } from "../../shared/base-classes/base.controller";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThanOrEqual, Repository } from 'typeorm';
import { Recommend } from './recommend.entity';
import { Product } from '../product/product.entity';

@Controller('recommend')
export class RecommendController extends BaseController {

  constructor(@InjectRepository(Recommend) private recommendRepository: Repository<Recommend>,
              @InjectRepository(Product) private productRepository: Repository<Product>) {
    super();
  }

  @Get(':userName')
  async find(@Param('userName') userName) {
    try {
      const currDate = (new Date()).toISOString().substr(0, 10);
      const requests = [
        this.recommendRepository.find({ userName, nextDate: LessThanOrEqual(currDate) }),
        this.productRepository.find()
      ] as Promise<any>[];
      let [recommends, products] = await Promise.all(requests);
      const result = recommends
        .map(recommend => {
          const name = products.find(product => product.id === recommend.productId)?.name || '';
          return { name, quantity: recommend.nextQuantity };
        })
        .filter(recommend => recommend.name);
      return this.successResponse(result);
    } catch(e) {
      console.log('error getting recommendation', e);
      return this.exceptionResponse(e.message);
    }
  }
}
