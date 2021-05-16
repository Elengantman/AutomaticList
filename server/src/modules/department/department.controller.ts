import { Controller, Get, Request } from '@nestjs/common';
import { BaseController } from "../../shared/base-classes/base.controller";
import { Department } from "./department.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Controller('department')
export class DepartmentController extends BaseController {

  constructor(@InjectRepository(Department) private departmentRepository: Repository<Department>) {
    super();
  }

  @Get()
  async find() {
    try {
      const departments: Department[] = await this.departmentRepository.find();
      return this.successResponse(departments);
    } catch(e) {
      console.log('error getting products', e);
      return this.exceptionResponse(e.message);
    }
  }
}
