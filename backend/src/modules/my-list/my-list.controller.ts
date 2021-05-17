import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { BaseController } from "../../shared/base-classes/base.controller";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MyList } from './my-list.entity';
import { Product } from '../product/product.entity';

@Controller('my-list')
export class MyListController extends BaseController {

  constructor(@InjectRepository(MyList) private myListRepository: Repository<MyList>,
              @InjectRepository(Product) private productRepository: Repository<Product>) {
    super();
  }

  @Get(':userName')
  async find(@Param('userName') userName) {
    try {
      const requests = [this.myListRepository.find({ userName }), this.productRepository.find()] as Promise<any>[];
      const [myList, products] = await Promise.all(requests);
      const myListIds = myList.map(item => item.productId);
      const result = products.map(product => {
        const isSelected = myListIds.includes(product.id);
        return { id: product.id, name: product.name, isSelected };
      });
      return this.successResponse(result);
    } catch(e) {
      console.log('error getting my list', e);
      return this.exceptionResponse(e.message);
    }
  }

  @Post(':userName')
  async insert(@Param('userName') userName, @Body() data) {
    try {
      const requests = [];
      const affectedRows = []

      if (data.add) {
        const records = data.add.map(id => ({ userName, productId: id }));
        requests.push(this.myListRepository.insert(records));
        affectedRows.push(records.length);
      }

      if (data.remove) {
        const records = data.remove.map(id => ({ userName, productId: id }));
        requests.push(this.myListRepository.delete(records));
        affectedRows.push(records.length);
      }

      const results = await Promise.all(requests);
      const isSuccess = results.every((result, i) => result?.raw?.affectedRows === affectedRows[i]);
      if (!isSuccess) return this.errorResponse('error updating my products');
      return this.successResponse();
    } catch(e) {
      console.log('error updating my list, userName:', userName, ', data:', data, ' error:', e);
      return this.exceptionResponse(e.message);
    }
  }
}
