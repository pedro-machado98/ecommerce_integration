import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
                return null
            }

            return cliente

        } catch (err) {
            throw new Error('\nErro ao buscar o cliente na tabela Clientes: ' + err);
        }

    }

    async createCliente(clientePedido: Cliente) {
        // let cliente
        try {

            const cliente = await this.getCliente(clientePedido)
    
            if(!cliente) {
                return await this.prismaService.clientes.create({
                    data: {
                        codigoCliente: clientePedido.codigoCliente,
                        nomeCliente: clientePedido.nomeCliente,
                        email: clientePedido.email,
                        endereco: clientePedido.endereco,
                        cep: clientePedido.cep,
                        uf: clientePedido.uf,
                        pais: clientePedido.pais,
                    }
                })
            } else {
                return cliente
            }

        } catch (e) {
            if(e instanceof Prisma.PrismaClientKnownRequestError) {
                if(e.code === 'P2002') {
                    console.log(
                        'Já existe esse cliente no banco de dados.'
                    )
                }
            }
            throw (e.message)
        }

    }
    updateCliente() {
        throw new Error('Method not implemented.');
    }
    deleteCliente() {
        throw new Error('Method not implemented.');
    }

}
