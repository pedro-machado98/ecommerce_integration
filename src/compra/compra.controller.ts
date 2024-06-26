import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { CompraService } from './compra.service';

@Controller('compra')
export class CompraController {
    constructor(private compraService: CompraService) {}

    @Get('')
    getAllCompras(@Req() req:any) {
        return this.compraService.getAllCompras();
    }
    
    @Get(':id')
    getCompra(@Req() req:any) {
        return this.compraService.getCompra();
    }
    
    @Post('')
    createCompra(@Req() req:any) {
        return this.compraService.createCompra();
    }
    
    @Put(':id')
    updateCompra(@Req() req:any) {
        return this.compraService.updateCompra();
    }
    
    @Delete(':id')
    deleteCompra(@Req() req:any) {
        return this.compraService.deleteCompra();
    }
}
