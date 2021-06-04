import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { BaseController } from "../../shared/base-classes/base.controller";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, InsertResult, Repository } from 'typeorm';
import { Purchase } from './purchase.entity';
import { Product } from '../product/product.entity';
import { MyList } from '../my-list/my-list.entity';

@Controller('purchase')
export class PurchaseController extends BaseController {

  constructor(@InjectRepository(MyList) private myListRepository: Repository<MyList>,
              @InjectRepository(Purchase) private purchaseRepository: Repository<Purchase>,
              @InjectRepository(Product) private productRepository: Repository<Product>) {
    super();
  }

  @Get(':userName')
  async find(@Param('userName') userName) {
    try {
      const requests = [this.myListRepository.find({ userName }), this.productRepository.find()] as Promise<any>[];
      const [myList, products] = await Promise.all(requests);
      const myListIds = myList.map(item => item.productId);
      const result = products
        .filter(product => myListIds.includes(product.id))
        .map(product => ({ id: product.id, name: product.name, price: product.price }));
      return this.successResponse(result);
    } catch(e) {
      console.log('error getting purchase list', e);
      return this.exceptionResponse(e.message);
    }
  }

  @Post('report')
  async report(@Param('userName') userName, @Body() query) {
    try {
      const purchaseQuery: any = { where: {}, order: { date: 'DESC' } };
      if (query?.userName) purchaseQuery.where.userName = query.userName;
      if (query?.productId) purchaseQuery.where.productId = query.productId;
      if (query?.fromDate) purchaseQuery.where.date = Between(query.fromDate, query.toDate);
      const requests = [this.purchaseRepository.find(purchaseQuery), this.productRepository.find()] as Promise<any>[];
      let [purchases, products] = await Promise.all(requests);
      const results = purchases.map(purchase => {
        const name = products.find(product => product.id === purchase.productId)?.name || '* obsolete';
        return { date: purchase.date, name, quantity: purchase.quantity };
      })
      return this.successResponse(results);
    } catch(e) {
      console.log('error getting purchase report', e);
      return this.exceptionResponse(e.message);
    }
  }

  @Post(':userName')
  async insert(@Param('userName') userName, @Body() items) {
    try {
      const purchaseId = (new Date()).toISOString().replace('T', ' ').substr(0, 23) + '-' + String(Math.round(Math.random() * 10000)).padStart(4, '0');
      const date = purchaseId.substr(0, 10);
      const records = items.map(item => ({ userName, purchaseId, date, productId: item.id, quantity: item.quantity }));
      const result: InsertResult = await this.purchaseRepository.insert(records);
      if (result?.raw?.affectedRows !== records.length) return this.errorResponse('error updating purchase');
      return this.successResponse();
    } catch(e) {
      console.log('error updating my list, userName:', userName, ', items:', items, ' error:', e);
      return this.exceptionResponse(e.message);
    }
  }
}
