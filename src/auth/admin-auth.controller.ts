import { Controller, Post, Body } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './dto/admin-auth.login.dto';

@Controller('auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  // Admin login to get JWT token
  @Post('login')
  async login(@Body() data: AdminLoginDto) {
    return this.adminAuthService.login(data.username, data.password);
  }
}
