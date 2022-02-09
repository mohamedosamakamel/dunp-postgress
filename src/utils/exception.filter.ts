import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TypeORMError } from 'typeorm';
@Catch()
export class AllExceptionsFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    /**
     * @description Exception json response
     * @param message
     */
    const responseMessage = (type, message, statusCode, errorObject = null) => {
      response.status(statusCode).json({
        statusCode,
        path: request.url,
        errorType: type,
        errorMessage: message,
        errorObject,
      });
    };

    // console.log(exception);
    // Throw an exceptions for either
    if (exception instanceof TypeORMError) {
      responseMessage(
        'POSTGRES_ERROR ' + exception.name,
        exception.message,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      responseMessage(
        'Error',
        exception.message,
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
        exception,
      );
    }
  }
}
