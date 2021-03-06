import { HttpException } from '@nestjs/common';
// import { HttpStatusCodes } from '@shared/enums/http-status-codes.enum';
import { EventEmitter } from 'events';

export abstract class BaseController extends EventEmitter {
  readonly DEFAULT_ERROR_CODE = 400; // HttpStatusCodes.DefaultError;

  protected successResponse(data: any = {}) {
    return { isSuccess: true, data };
  }

  protected errorResponse(message = '', code = this.DEFAULT_ERROR_CODE) {
    return { isSuccess: false, error: { code, message: message }};
  }

  protected exceptionResponse(message, status = this.DEFAULT_ERROR_CODE) {
    // throw new HttpException({ status, error: message }, status);
    throw new HttpException(message, status);
  }
}
