import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { BaseController } from "../../shared/base-classes/base.controller";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Department } from '../department/department.entity';
import { Product } from '../product/product.entity';

@Controller('product-setup')
export class ProductSetupController extends BaseController {

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>,
              @InjectRepository(Department) private departmentRepository: Repository<Department>) {
    super();
  }

  @Get()
  async find() {
    try {
      const requests = [this.productRepository.find({ order: { name: 'ASC' }}), this.departmentRepository.find()] as Promise<any>[];
      const [products, departments] = await Promise.all(requests);
      const result = products.map(product => {
        const department = departments.find(department => department.id === product.departmentId).name;
        return { id: product.id, name: product.name, price: product.price, department };
      })
      return this.successResponse(result);
    } catch(e) {
      console.log('error getting product setup', e);
      return this.exceptionResponse(e.message);
    }
  }

  @Post('/')
  async update(@Body() products) {
    try {
      const result = await this.productRepository.save(products);
      if (result?.length !== products.length) return this.errorResponse('error updating product setup');
      return this.successResponse();
    } catch(e) {
      console.log('error updating product setup:', products, ' error:', e);
      return this.exceptionResponse(e.message);
    }
  }
}
