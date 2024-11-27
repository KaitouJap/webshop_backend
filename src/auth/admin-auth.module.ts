import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, JwtStrategy, JwtService],
})
export class AdminAuthModule {}