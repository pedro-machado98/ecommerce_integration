import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './produto/produto.module';
import { ClienteModule } from './cliente/cliente.module';
import { EstoqueModule } from './estoque/estoque.module';
import { PedidoModule } from './pedido/pedido.module';
import { CompraModule } from './compra/compra.module';
import { MovimentacaoEstoqueModule } from './movimentacao_estoque/movimentacao_estoque.module';
import { ConfigModule } from '@nestjs/config';
import { EcommerceShopModule } from './ecommerce_shop/ecommerce_shop.module';
import { EcommerceFactoryModule } from './ecommerce-factory/ecommerce-factory.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';
import { EcommerceasdModule } from './ecommerceasd/ecommerceasd.module';

@Module({
  imports: [ProdutoModule, ClienteModule, EstoqueModule, PedidoModule, CompraModule, MovimentacaoEstoqueModule,
    ConfigModule.forRoot(),
    EcommerceShopModule,
    EcommerceFactoryModule,
    EcommerceModule,
    EcommerceasdModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
