import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as winston from 'winston';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, body } = req;
    const start = Date.now();
    const url = req.originalUrl;

    res.on('finish', () => {
      const duration = Date.now() - start;
      const logMessage: any = {
        method,
        url,
        body,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
      };

      if (res.statusCode >= 400) {
        const errorMessage = res.locals.errorMessage || 'Unknown error';

        logMessage['errorMessage'] = errorMessage;
        this.logger.error(logMessage);
      } else {
        this.logger.info(logMessage);
      }
    });

    next();
  }
}
