import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { validateToken } from '@shared/utils/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Authorization header is missing' });
    }

    try {
      validateToken(authHeader);
      next();
    } catch (error) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid authorization' });
    }
  }
}
