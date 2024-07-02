import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { PedidoService } from './pedido.service';

@Controller('pedido')
export class PedidoController {
    constructor(private pedidoService: PedidoService) {}

    @Get('')
    getAllPedidos(@Req() req:any) {
        return this.pedidoService.getAllPedidos();
    }
    
    @Get(':id')
    getPedido(@Req() req:any) {
        return this.pedidoService.getPedido();
    }
    
    @Post('')
    createPedido(@Req() req:any) {
        return this.pedidoService.createPedido(req.body);
    }
    
    @Put(':id')
    updatePedido(@Req() req:any) {
        return this.pedidoService.updatePedido();
    }
    
    @Delete(':id')
    deletePedido(@Req() req:any) {
        return this.pedidoService.deletePedido();
    }
}
