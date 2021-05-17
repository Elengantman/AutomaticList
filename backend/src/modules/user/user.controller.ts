import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { BaseController } from "../../shared/base-classes/base.controller";
import { User } from "./user.entity";
import { InsertResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Controller('user')
export class UserController extends BaseController {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    super();
  }

  @Get()
  async find() {
    try {
      const users: User[] = await this.userRepository.find();
      return this.successResponse(users);
    } catch(e) {
      console.log('error getting users', e);
      return this.exceptionResponse(e.message);
    }
  }

  @Get(':userName')
  async findOne(@Param('userName') userName) {
    try {
      const user: User = await this.userRepository.findOne(userName);
      return this.successResponse(user);
    } catch(e) {
      console.log('error getting user, userName:', userName, ', error:', e);
      return this.exceptionResponse(e.message);
    }
  }

  @Post('/')
  async insert(@Body() user) {
    try {
      const result: InsertResult = await this.userRepository.insert(user);
      if (result?.raw?.affectedRows !== 1) return this.errorResponse();
      return this.successResponse();
    } catch(e) {
      console.log('error adding user:', user, ' error:', e);
      return this.exceptionResponse(e.message);
    }
  }
}
