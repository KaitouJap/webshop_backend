import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminAuthService {
  constructor(private readonly jwtService: JwtService,
    private readonly configService: ConfigService,) {}

  // Generate JWT token for admin user
  async login(username: string, password: string): Promise<{ access_token: string }> {
    const storedUsername = this.configService.get<string>('ADMIN_USERNAME');
    const storedPassword = this.configService.get<string>('ADMIN_PASSWORD');

    if(username !== storedUsername || password !== storedPassword) throw new UnauthorizedException("Invalid credentials!");

    const payload = { username };
    const secret = this.configService.get<string>('JWT_SECRET');
    const token = this.jwtService.sign(payload, { secret });
    return {
      access_token: token,
    };
  }
}
