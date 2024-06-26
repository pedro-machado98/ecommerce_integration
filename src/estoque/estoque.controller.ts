import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { EstoqueService } from './estoque.service';

@Controller('estoque')
export class EstoqueController {
    constructor(private estoqueService: EstoqueService) {}

    @Get('')
    getAllEstoques(@Req() req:any) {
        return this.estoqueService.getAllEstoques();
    }
    
    @Get(':id')
    getEstoque(@Req() req:any) {
        return this.estoqueService.getEstoque();
    }
    
    @Post('')
    createEstoque(@Req() req:any) {
        return this.estoqueService.createEstoque();
    }
    
    @Put(':id')
    updateEstoque(@Req() req:any) {
        return this.estoqueService.updateEstoque();
    }
    
    @Delete(':id')
    deleteEstoque(@Req() req:any) {
        return this.estoqueService.deleteEstoque();
    }
}
