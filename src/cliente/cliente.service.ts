import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface Cliente {
    id: number;
    codigoCliente:    number
    nomeCliente:   string
    email: string
    endereco:    string
    cep:  string
    uf:  string
    pais:  string
}

@Injectable()
export class ClienteService {

    constructor(private prismaService: PrismaService){}

    getAllClientes() {
        throw new Error('Method not implemented.');
    }

    async getCliente(clientePedido: Cliente) {
        let cliente: Cliente;
        try {
            cliente = await this.prismaService.clientes.findUnique({
                where: {
                    codigoCliente: clientePedido.codigoCliente
                }
            })
    
            if(!cliente) {
                await this.createCliente(clientePedido)
            }

            return cliente

        } catch (err) {
            throw new Error('Erro ao buscar o cliente na tabela Clientes: ' + err);
        }

    }

    async createCliente(cliente: Cliente) {

        try {
            const createdCliente = await this.prismaService.clientes.create({
                data: {
                    codigoCliente: cliente.codigoCliente,
                    nomeCliente: cliente.nomeCliente,
                    email: cliente.email,
                    endereco: cliente.endereco,
                    cep: cliente.cep,
                    uf: cliente.uf,
                    pais: cliente.pais,
                }
            })

            return createdCliente;
        } catch (err) {
            throw new Error("Erro ao criar o cliente. " + err);
        }

    }
    updateCliente() {
        throw new Error('Method not implemented.');
    }
    deleteCliente() {
        throw new Error('Method not implemented.');
    }

}
