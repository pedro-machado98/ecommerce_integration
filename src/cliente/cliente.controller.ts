import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {
    constructor(private clienteService: ClienteService) {}

    @Get('')
    getAllClientes(@Req() req:any) {
        return this.clienteService.getAllClientes();
    }
    
    @Get(':id')
    getCliente(@Req() req:any) {
        return this.clienteService.getCliente();
    }
    
    @Post('')
    createCliente(@Req() req:any) {
        return this.clienteService.createCliente();
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
