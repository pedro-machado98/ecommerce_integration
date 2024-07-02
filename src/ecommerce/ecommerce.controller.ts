import { Controller, Get, Param } from '@nestjs/common';

import { EcommerceService } from './ecommerce.service';

@Controller('ecommerce')
export class EcommerceController {
  constructor(private readonly ecommerceService: EcommerceService) {}

  @Get(':canal')
  importarPedidos(@Param('canal') canal : string ) {
    return this.ecommerceService.importarPedidos(canal);
  }


}
