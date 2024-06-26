import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { MovimentacaoEstoqueService } from './movimentacao_estoque.service';

@Controller('movimentacao_estoque')
export class MovimentacaoEstoqueController {
    constructor(private movimentacaoEstoqueService: MovimentacaoEstoqueService) {}

    @Get('')
    getAllMovimentacoes(@Req() req:any) {
        return this.movimentacaoEstoqueService.getAllMovimentacoes();
    }
    
    @Get(':id')
    getMovimentacao(@Req() req:any) {
        return this.movimentacaoEstoqueService.getMovimentacao();
    }
    
    @Post('')
    createMovimentacao(@Req() req:any) {
        return this.movimentacaoEstoqueService.createMovimentacao();
    }
    
    @Put(':id')
    updateMovimentacao(@Req() req:any) {
        return this.movimentacaoEstoqueService.updateMovimentacao();
    }
    
    @Delete(':id')
    deleteMovimentacao(@Req() req:any) {
        return this.movimentacaoEstoqueService.deleteMovimentacao();
    }
}
