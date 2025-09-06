import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest<Request>();
    //console.log("cookies:" ,req.cookies);
    const token = req.cookies?.jwt;
    if (!token) throw new UnauthorizedException('No auth token1');
    const payload = await this.jwt.verifyAsync(token);
    // attach user to request if you want
    
    (req as any).user = { id: payload.sub, username: payload.username };
    return true;
  }
}
