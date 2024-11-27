import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Extract token

    if (!token) {
      return false; // No token, unauthorized
    }

    try {
      const payload: JwtPayload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET }); // Verify token
      request.user = payload; // Attach user to the request object
      return true;
    } catch (error) {
      return false; // Token invalid or expired
    }
  }
}
