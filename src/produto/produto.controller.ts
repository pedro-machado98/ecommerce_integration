import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {
    constructor(private produtoService: ProdutoService) {}

    @Get('')
    getAllProdutos(@Req() req:any) {
        return this.produtoService.getAllProdutos()
    }
    
    @Get(':id')
    getProduto(@Req() req:any) {
        return this.produtoService.getProduto()
    }
    
    @Post('')
    createProdutos(@Req() req:any) {
        return this.produtoService.createProduto()
    }
    
    @Put(':id')
    updateProduto(@Req() req:any) {
        return this.produtoService.updateProduto()
    }
    
    @Delete(':id')
    deleteProduto(@Req() req:any) {
        return this.produtoService.deleteProduto()
    }
    
}
