import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class StaticJwtAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    console.log('[StaticJwtAuthGuard] Authorization header:', authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or malformed Authorization header');
    }
    const token = authHeader.slice(7).trim();
    console.log('[StaticJwtAuthGuard] Extracted token:', token);
    const staticToken = this.configService.get<string>('JWT_SECRET');
    if (token !== staticToken) {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }
}
