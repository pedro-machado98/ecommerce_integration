import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { CompraModule } from './compra/compra.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';
import { EstoqueModule } from './estoque/estoque.module';
import { MovimentacaoEstoqueModule } from './movimentacao_estoque/movimentacao_estoque.module';
import { PedidoModule } from './pedido/pedido.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [ProdutoModule,
    ClienteModule,
    EstoqueModule,
    PedidoModule, 
    CompraModule, 
    MovimentacaoEstoqueModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    EcommerceModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
