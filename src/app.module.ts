import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthModule } from './auth/admin-auth.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '1h' },
    }),
    ProductsModule,
    AdminAuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
