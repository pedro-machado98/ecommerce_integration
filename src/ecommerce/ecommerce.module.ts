import { Module } from '@nestjs/common';
import { EcommerceService } from './ecommerce.service';
import { EcommerceController } from './ecommerce.controller';

@Module({
  controllers: [EcommerceController],
  providers: [EcommerceService],
})
export class EcommerceModule {}
