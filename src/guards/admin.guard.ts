import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Kompaniya } from 'src/kompaniya/models/admin.model';


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Kompaniya unauthorized');
    }

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer != 'Bearer' || !token) {
      throw new UnauthorizedException('Kompaniya unauthorized');
    }

    async function verify(token: string, jwtService: JwtService) {
      const admin: Partial<Kompaniya> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      if (!admin) {
        throw new UnauthorizedException('Invalid token provided');
      }
      if (!admin.is_active) {
        throw new BadRequestException('admin is not active');
      }
      return true;
    }

    return verify(token, this.jwtService);
  }
}
