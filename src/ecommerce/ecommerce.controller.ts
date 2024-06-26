import { Controller, Get } from '@nestjs/common';
import { EcommerceService } from './ecommerce.service';


@Controller('ecommerce')
export class EcommerceController {
  constructor(private readonly ecommerceService: EcommerceService) {}

  @Get()
  importarPedidos() {
    return this.ecommerceService.importarPedidos();
  }


}
