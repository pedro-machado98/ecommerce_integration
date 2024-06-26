import { Module } from '@nestjs/common';
import { MovimentacaoEstoqueController } from './movimentacao_estoque.controller';
import { MovimentacaoEstoqueService } from './movimentacao_estoque.service';

@Module({
  controllers: [MovimentacaoEstoqueController],
  providers: [MovimentacaoEstoqueService]
})
export class MovimentacaoEstoqueModule {}
