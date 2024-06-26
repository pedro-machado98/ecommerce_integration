import { Module } from '@nestjs/common';
import { EstoqueController } from './estoque.controller';
import { EstoqueService } from './estoque.service';

@Module({
  controllers: [EstoqueController],
  providers: [EstoqueService]
})
export class EstoqueModule {}
