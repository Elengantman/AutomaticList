import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from "./modules/user/user.module";
import { DepartmentModule } from "./modules/department/department.module";
import { ProductModule } from "./modules/product/product.module";
import { AuthModule } from "./modules/auth/auth.module";
import { MyListModule } from './modules/my-list/my-list.module';

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
    DepartmentModule,
    ProductModule,
    AuthModule,
    MyListModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
