import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProdutoService } from 'src/produto/produto.service';

import { ClienteService } from './../cliente/cliente.service';

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

type Canal = 'Amazon' | 'Magalu' | 'Meli'


interface Pedido {
    idCarga:    number
    codigoPedido: number
    valor: number
    quantidade: number
    email: string
    idProduto: number
    codigoProduto: string
    nomeProduto: string
    sku: number
    ean: number
    fabricante: string
    idCliente: number
    codigoCliente: number
    nomeCliente: string
    endereco: string
    cep: string
    uf: string
    pais: string
    // status: string
    // canal: 'Amazon' | 'Meli' | 'Magalu'
    // movimentacao_de_estoque: Movimentacao_de_estoque
}

@Injectable()
export class PedidoService {

    constructor(
        private prismaService: PrismaService,
        private clienteService: ClienteService,
        private produtoService: ProdutoService
    ){}


    getAllPedidos() {
        throw new Error('Method not implemented.');
    }
    async getPedido(codigopedido: number) {

        try {
            const pedido = await this.prismaService.pedidos.findUnique({
                where: {
                    codigoPedido: codigopedido
                }
            })
    
            if(!pedido) {
                return null
            }

            return pedido

        } catch (err) {
            throw new Error('Erro ao criar o pedido na tabela pedidos: ' + err);
        }


        throw new Error('Method not implemented.');
    }
    async createPedido(pedido: Pedido, canal: Canal ) {
        let novoCliente
        let novoProduto
        try {

            const cliente = await this.clienteService.getCliente(pedido.codigoCliente)
            const produto = await this.produtoService.getProduto(pedido.codigoProduto)
            const pedidoJaImportado = await this.getPedido(pedido.codigoPedido)


            if(!cliente) {
                novoCliente = await this.clienteService.createCliente(pedido)
            }

            if (!produto) {
                novoProduto = await this.produtoService.createProduto(pedido)
            }

            if(pedidoJaImportado) {
                return 
            }

            const createdPedido = await this.prismaService.pedidos.create({
                data: {
                        codigoPedido: pedido.codigoPedido,
                        valor: pedido.valor,
                        quantidade: pedido.quantidade,
                        idProduto: produto ? produto.id : novoProduto.id,
                        codigoProduto: pedido.codigoProduto,
                        idCliente: cliente ? cliente.id : novoCliente.id,
                        codigoCliente: pedido.codigoCliente,
                        endereco: pedido.endereco,
                        cep: pedido.cep,
                        uf: pedido.uf,
                        pais: pedido.pais,
                        canal: canal,
                }
            })

        } catch (err) {
            throw new Error("Erro ao criar o cliente. " + err);
        }
    }
    updatePedido() {
        throw new Error('Method not implemented.');
    }
    deletePedido() {
        throw new Error('Method not implemented.');
    }
}
