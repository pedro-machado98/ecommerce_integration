import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface Cliente {
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
    getCliente() {
        throw new Error('Method not implemented.');
    }
    createCliente(cliente: Cliente) {

        try {
            const createdCliente = this.prismaService.clientes.create({
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

        } catch (err) {
            throw new Error("Erro ao criar o cliente. " + err);
        }

        throw new Error('Method not implemented.');
    }
    updateCliente() {
        throw new Error('Method not implemented.');
    }
    deleteCliente() {
        throw new Error('Method not implemented.');
    }

}
