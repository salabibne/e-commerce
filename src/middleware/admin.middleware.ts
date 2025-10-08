import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      throw new ForbiddenException('Access denied. Admins only.');
    }
  }
}
