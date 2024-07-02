import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CanaisFactory } from './ecommerce_factory/canais.factory';
import { EcommerceController } from './ecommerce.controller';
import { EcommerceService } from './ecommerce.service';

@Module({
  imports: [HttpModule],
  controllers: [EcommerceController],
  providers: [EcommerceService, CanaisFactory],
})
export class EcommerceModule {}
