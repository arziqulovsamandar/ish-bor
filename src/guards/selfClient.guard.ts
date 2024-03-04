import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Ishchilar } from 'src/ishchilar/models/admin.model';

@Injectable()
export class selfClientGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Ishchilar unauthorized');
    }

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer != 'Bearer' || !token) {
      throw new UnauthorizedException('Ishchilar unauthorized');
    }

    async function verify(token: string, jwtService: JwtService) {
      const user: Partial<Ishchilar> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      if (!user) {
        throw new UnauthorizedException('Invalid token provided');
      }
      if (!user.is_active) {
        throw new BadRequestException('Ishchilar is not active');
      }

      if (String(user.id) !== req.params.id) {
        throw new ForbiddenException({
          message: 'Ruxsat etilmagan foydalanuvchi',
        });
      }

      return true;
    }

    return verify(token, this.jwtService);
  }
}
