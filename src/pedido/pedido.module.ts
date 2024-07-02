import { Module } from '@nestjs/common';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';
import { ClienteModule } from 'src/cliente/cliente.module';
import { ProdutoModule } from 'src/produto/produto.module';

@Module({
  imports: [ClienteModule, ProdutoModule],
  controllers: [PedidoController],
  providers: [PedidoService],
  exports: [PedidoService]
})
export class PedidoModule {}
