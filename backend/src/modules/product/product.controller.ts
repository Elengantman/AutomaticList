import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { BaseController } from "../../shared/base-classes/base.controller";
import { Product } from "./product.entity";
import { InsertResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Controller('product')
export class ProductController extends BaseController {

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {
    super();
  }

  @Get()
  async find() {
    try {
      const products: Product[] = await this.productRepository.find();
      return this.successResponse(products);
    } catch(e) {
      console.log('error getting products', e);
      return this.exceptionResponse(e.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    try {
      const product: Product = await this.productRepository.findOne(id);
      return this.successResponse(product);
    } catch(e) {
      console.log('error getting product, id:', id, ', error:', e);
      return this.exceptionResponse(e.message);
    }
  }

  @Post('/')
  async insert(@Body() product) {
    try {
      const result: InsertResult = await this.productRepository.insert(product);
      if (result?.raw?.affectedRows !== 1) return this.errorResponse();
      return this.successResponse();
    } catch(e) {
      console.log('error adding product:', product, ' error:', e);
      return this.exceptionResponse(e.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    try {
      const result = await this.productRepository.delete(id);
      if (result?.raw?.affectedRows !== 0 && result?.raw?.affectedRows !== 1) this.errorResponse('error deleting product');
      return this.successResponse();
    } catch(e) {
      console.log('error deleting product, error:', e);
      return this.exceptionResponse(e.message);
    }
  }
}
