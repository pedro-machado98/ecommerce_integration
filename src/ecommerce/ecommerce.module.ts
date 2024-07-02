import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CanaisFactory } from './ecommerce_factory/canais.factory';
import { EcommerceController } from './ecommerce.controller';
import { EcommerceService } from './ecommerce.service';
import { PedidoModule } from 'src/pedido/pedido.module';
import { ProdutoModule } from 'src/produto/produto.module';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({
  imports: [HttpModule, PedidoModule, ProdutoModule, ClienteModule],
  controllers: [EcommerceController],
  providers: [EcommerceService, CanaisFactory],
})
export class EcommerceModule {}
