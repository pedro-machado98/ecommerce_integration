import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {
    constructor(private clienteService: ClienteService) {}

    @Get('')
    getAllClientes(@Req() req:any) {
        return this.clienteService.getAllClientes();
    }
    
    @Get(':id')
    getCliente(@Param('id') id:number, @Req() req:any) {
        return this.clienteService.getCliente(id);
    }
    
    @Post('')
    createCliente(@Req() req:any) {
        return this.clienteService.createCliente(req.body);
    }
    
    @Put(':id')
    updateCliente(@Req() req:any) {
        return this.clienteService.updateCliente();
    }
    
    @Delete(':id')
    deleteCliente(@Req() req:any) {
        return this.clienteService.deleteCliente();
    }
}
