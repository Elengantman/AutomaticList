import { Controller, Get, Param } from '@nestjs/common';
import { BaseController } from "../../shared/base-classes/base.controller";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Recommend } from './recommend.entity';

@Controller('recommend')
export class RecommendController extends BaseController {

  constructor(@InjectRepository(Recommend) private recommendRepository: Repository<Recommend>) {
    super();
  }

  @Get(':userName')
  async find(@Param('userName') userName) {
    try {
      const currDate = (new Date()).toISOString().substr(0, 10);
      const recommends: Recommend[] = await this.recommendRepository.find({ userName, nextDate: LessThanOrEqual(currDate) });
      return this.successResponse(recommends);
    } catch(e) {
      console.log('error getting recommendation', e);
      return this.exceptionResponse(e.message);
    }
  }
}
