import { Module } from '@nestjs/common';
import { CanaisFactory } from 'src/ecommerce/ecommerce_factory/canais.factory';

import { MovimentacaoEstoqueController } from './movimentacao_estoque.controller';
import { MovimentacaoEstoqueService } from './movimentacao_estoque.service';

@Module({
  controllers: [MovimentacaoEstoqueController],
  providers: [MovimentacaoEstoqueService, CanaisFactory]
})
export class MovimentacaoEstoqueModule {}
