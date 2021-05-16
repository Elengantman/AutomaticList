import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from "./department.entity";
import { DepartmentController } from "./department.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DepartmentController],
})
export class DepartmentModule {}
