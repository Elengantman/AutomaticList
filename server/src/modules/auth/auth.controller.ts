import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { BaseController } from "../../shared/base-classes/base.controller";
import { ServerResponse } from '../../../../shared/models/server-response.model';
import { InsertResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";

@Controller('auth')
export class AuthController extends BaseController {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    super();
  }

  @Post('login')
  async login(@Body() credentials) {
    try {
      const user: User = await this.userRepository.findOne(credentials);
      if (!user || user.password !== credentials.password) return this.errorResponse('incorrect user/password');
      return this.successResponse(user);
    } catch(e) {
      return this.errorResponse(e.message);
    }
  }

  @Post('sign-in')
  async insert(@Body() user): Promise<ServerResponse | void> {
    try {
      const result: InsertResult = await this.userRepository.insert(user);
      if (result?.raw?.affectedRows !== 1) return this.errorResponse();
      return this.successResponse();
    } catch(e) {
      if (e.code === 'ER_DUP_ENTRY') {
        return this.errorResponse(`user ${user.userName} already exist`);
      } else {
        console.log('error adding user:', user, ' error:', e);
        return this.exceptionResponse(e.message);
      }
    }
  }
}
