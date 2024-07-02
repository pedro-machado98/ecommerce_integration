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

interface Produto {
    codigoProduto: string
    nomeProduto: string
    sku: number
    ean: number
    fabricante: string
    qtd_estoque: number
}

interface Movimentacao_de_estoque {

}


interface Pedido {
    id:    number
    codigoPedido: number
    valor: number
    quantidade: number
    produto: Produto
    idProduto: number
    codigoProduto: string
    cliente: number
    idCliente: number
    codigoCliente: number
    endereco: string
    cep: string
    uf: string
    pais: string
    status: string
    canal: 'Amazon' | 'Meli' | 'Magalu'
    movimentacao_de_estoque: Movimentacao_de_estoque
}

@Injectable()
export class PedidoService {

    constructor(private prismaService: PrismaService){}


    getAllPedidos() {
        throw new Error('Method not implemented.');
    }
    getPedido() {
        throw new Error('Method not implemented.');
    }
    createPedido(pedido: Pedido) {

        try {
            const createdCliente = this.prismaService.pedidos.create({
                data: {
                    codigoPedido: pedido.codigoPedido,
                    valor: pedido.valor,
                    quantidade: pedido.quantidade,
                    idProduto: pedido.idProduto,
                    codigoProduto: pedido.codigoProduto,
                    idCliente: pedido.idCliente,
                    codigoCliente: pedido.codigoCliente,
                    endereco: pedido.endereco,
                    cep: pedido.cep,
                    uf: pedido.uf,
                    pais: pedido.pais,
                    canal: pedido.canal,
                    movimentacaoDeEstoque: pedido.movimentacao_de_estoque
                }
            })

        } catch (err) {
            throw new Error("Erro ao criar o cliente. " + err);
        }

        throw new Error('Method not implemented.');

        throw new Error('Method not implemented.');
    }
    updatePedido() {
        throw new Error('Method not implemented.');
    }
    deletePedido() {
        throw new Error('Method not implemented.');
    }
}
