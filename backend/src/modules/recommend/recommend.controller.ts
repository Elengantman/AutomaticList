import { Controller, Get, Param } from '@nestjs/common';
import { BaseController } from "../../shared/base-classes/base.controller";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Product } from '../product/product.entity';
import { MyList } from '../my-list/my-list.entity';
import { Purchase } from '../purchase/purchase.entity';
import { Department } from '../department/department.entity';

@Controller('recommend')
export class RecommendController extends BaseController {
  BACK_DAYS = 90;  // effective days back in recommendation calculation
  DAY_IN_MS =  86_400_000;   // 1 day on ms - 24 * 60 * 60 * 1000;

  constructor(@InjectRepository(Department) private departmentRepository: Repository<Department>,
              @InjectRepository(Product) private productRepository: Repository<Product>,
              @InjectRepository(MyList) private myListRepository: Repository<MyList>,
              @InjectRepository(Purchase) private purchaseRepository: Repository<Purchase>) {
    super();
  }

  @Get(':userName')
  async temp(@Param('userName') userName) {
    try {


      const backDate = this.getBackDate(this.BACK_DAYS);

      const requests = [
        this.myListRepository.find({ where: { userName }}),
        this.productRepository.find(),
        this.departmentRepository.find(),
        this.purchaseRepository.find({ where: { userName, date: MoreThanOrEqual(backDate) }, order: { productId: 'ASC', date: 'ASC' }})
      ] as Promise<any>[];

      const [listItems, products, departments, purchases] = await Promise.all(requests);

      const recommendations = [];
      for (const listItem of listItems) {
        const product = products.find(product => product.id === listItem.productId);
        if (!product) continue;  // product has been deleted
        const productPurchases = purchases.filter(purchase => purchase.productId === listItem.productId);
        if (productPurchases.length < 2) continue;

        // calculate the days between first and last purchase
        const firstPurchaseDate = productPurchases[0].date;
        const lastPurchaseDate = productPurchases[productPurchases.length - 1].date;
        const daysDiff = this.getDaysDiff(firstPurchaseDate, lastPurchaseDate);
        if (daysDiff === 0) continue;

        // calc the minimum between average days and expiration days
        const avgDaysGap = Math.round(daysDiff / (productPurchases.length - 1));
        const department = departments.find(department => department.id === product.departmentId);
        const nextDays = Math.min(avgDaysGap, department.expDays);

        // next date is the last purchase date plus calculated next days
        const epochEndTime = (new Date(lastPurchaseDate)).getTime();
        const nextDate = (new Date(epochEndTime + nextDays * this.DAY_IN_MS)).toISOString().substr(0, 10);

        // if recommendation date is in the future then skip
        const currDate = (new Date()).toISOString().substr(0, 10);
        if (nextDate > currDate) continue;

        // calculate the average quantity
        const totalQuantity = productPurchases.reduce((sum, purchase) => sum + purchase.quantity, 0);
        const nextQuantity = Math.round(totalQuantity / productPurchases.length);
        recommendations.push({ name: product.name, quantity: nextQuantity });
      }
      return this.successResponse(recommendations);
    } catch(e) {
      console.log('error getting recommendation', e);
      return this.exceptionResponse(e.message);
    }
  }

  getBackDate(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().substr(0, 10);
  }

  getDaysDiff(startDate, endDate) {
    const epochStartTime = (new Date(startDate)).getTime();
    const epochEndTime = (new Date(endDate)).getTime();
    return Math.round((epochEndTime - epochStartTime) / this.DAY_IN_MS);
  }
}
