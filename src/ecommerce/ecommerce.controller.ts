import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EcommerceService } from './ecommerce.service';
import { CreateEcommerceDto } from './dto/create-ecommerce.dto';
import { UpdateEcommerceDto } from './dto/update-ecommerce.dto';

@Controller('ecommerce')
export class EcommerceController {
  constructor(private readonly ecommerceService: EcommerceService) {}

  @Get()
  findAll() {
    return this.ecommerceService.importarPedidos();
  }


}
