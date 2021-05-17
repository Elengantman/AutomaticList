import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from "./modules/user/user.module";
import { ProductModule } from "./modules/product/product.module";
import { AuthModule } from "./modules/auth/auth.module";
import { MyListModule } from './modules/my-list/my-list.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { ProductSetupModule } from './modules/product-setup/product-setup.module';
import { RecommendModule } from './modules/recommend/recommend.module';
import { DepartmentModule } from './modules/department/department.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'automatic-list',
      autoLoadEntities: true
    }),
    UserModule,
    ProductModule,
    AuthModule,
    MyListModule,
    PurchaseModule,
    ProductSetupModule,
    RecommendModule,
    DepartmentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
