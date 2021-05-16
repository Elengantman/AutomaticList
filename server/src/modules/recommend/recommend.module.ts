import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendController } from "./recommend.controller";
import { Recommend } from './recommend.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recommend])],
  controllers: [RecommendController],
})
export class RecommendModule {}
