import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { map, throwError } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProdutoService } from 'src/produto/produto.service';

import { ClienteService } from './../cliente/cliente.service';

// interface Cliente {
//     codigoCliente:    number
//     nomeCliente:   string
//     email: string
//     endereco:    string
//     cep:  string
//     uf:  string
//     pais:  string
// }

// interface Produto {
//     codigoProduto: string
//     nomeProduto: string
//     sku: number
//     ean: number
//     fabricante: string
//     qtd_estoque: number
// }

interface Movimentacao_de_estoque {

}

type Canal = 'Amazon' | 'Magalu' | 'Meli'


interface Pedido {
    id: number
    idCarga:    number
    codigoPedido: number
    valor: number
    valorTotal: number
    quantidade: number
    email: string
    idProduto: number
    codigoProduto: string
    nomeProduto: string
    sku: bigint
    ean: bigint
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

        try {

            const cliente = await this.clienteService.createCliente(pedido)
            // const produto = await this.produtoService.getProduto(pedido)
            const pedidoJaImportado = await this.getPedido(pedido.codigoPedido)

            // if (!produto) {
            //     novoProduto = await this.produtoService.createProduto(pedido)
            // }


            if(!pedidoJaImportado) {
                const createdPedido = await this.prismaService.pedidos.create({
                    data: {
                            codigoPedido: pedido.codigoPedido,
                            valor: pedido.valor,
                            valorTotal: pedido.valorTotal,
                            quantidade: pedido.quantidade,
                            produtos: {
                                create: [
                                    {
                                        produto: {
                                            connectOrCreate: {
                                                where: {
                                                    codigoProduto: pedido.codigoProduto
                                                },
                                                create: {
                                                    codigoProduto: pedido.codigoProduto,
                                                    nomeProduto: pedido.nomeProduto,
                                                    sku: pedido.sku,
                                                    ean: pedido.ean,
                                                    fabricante: pedido.fabricante,
                                                }
                                            }
                                        }
                                    }
                                ]
                            },
                            idCliente: cliente.id,
                            codigoCliente: pedido.codigoCliente,
                            endereco: pedido.endereco,
                            cep: pedido.cep,
                            uf: pedido.uf,
                            pais: pedido.pais,
                            canal: canal,
                    }
                })
            }

        } catch (e) {
            if(e instanceof Prisma.PrismaClientKnownRequestError) {
                if(e.code === 'P2002') {
                    console.log(
                        'Violação da constrain de codigoPedido. Tentou registrar pedido já cadastrado no banco'
                    )
                }
            }
            throw (e.message);
        }
    }
    
    updatePedido() {
        throw new Error('Method not implemented.');
    }
    deletePedido() {
        throw new Error('Method not implemented.');
    }

    async processarTodosOsPedidos() {

        const pedidos = await this.prismaService.pedidos.findMany({
            
            where: {
                status: "Importado"
            },
            orderBy: {
                valorTotal: 'desc'
            },
            include: {
                produtos: true
            },
        });

        let pedidosPorCliente = pedidos.reduce((acc, pedido) => {
            if(!acc[pedido.codigoCliente]) {
                acc[pedido.codigoCliente] = []
            }

            acc[pedido.codigoCliente].push(pedido);
            return acc;
        }, [])

        pedidosPorCliente = pedidosPorCliente.filter(array => array.length > 0);

        pedidosPorCliente = pedidosPorCliente.sort((a, b) => {
            let valorA = a[0].valorTotal;
            let valorB = b[0].valorTotal;
            return valorB - valorA;
          });

        pedidosPorCliente.map(async (pedido) => {

            if(pedido.length == 1) {
                pedido.map(async (pedido) => {
                    // console.log("Cliente fez apenas um pedido " + pedido.codigoPedido)

                    await this.criaMovimentacao(pedido)
    
                })
                
                
            } else {
                let cont = 0;
                let qtdProdutosDoPedido = pedido.length;
                // let produtosMesmoPedido;


                for (let i = 0; i < qtdProdutosDoPedido; i++) {
                    const pedidoAtual = pedido[i];

                    const produto = await this.prismaService.produtos.findUnique({
                        where: {
                            id: pedidoAtual.produtos[0].produtoId
                        }
                    });

                    if (produto.codigoProduto === 'PROD001') debugger;
                    if (produto.qtd_estoque < pedidoAtual.quantidade) {
                        console.log("Não é possível completar o pedido pois o produto " + produto.nomeProduto + " está em falta");

                        const compras = await this.prismaService.compras.create({
                            data: {
                                idProduto: produto.id,
                                codigoProduto: produto.codigoProduto,
                                quantidadeParaCompra: ((produto.qtd_estoque - pedidoAtual.quantidade) * -1)
                            }
                        });

                        if (compras) {
                            console.log(`Pendência de compra do produto ${produto.nomeProduto} criada`);
                        }
                    } else {
                        cont++;
                    }
                }

                if (cont === qtdProdutosDoPedido) {
                    for (let i = 0; i < qtdProdutosDoPedido; i++) {
                        const pedidoAtual = pedido[i];

                        const produto = await this.prismaService.produtos.findUnique({
                            where: {
                                id: pedidoAtual.produtos[0].produtoId
                            }
                        });

                        const movimentacao = await this.prismaService.movimentacao_de_estoque.create({
                            data: {
                                idProduto: produto.id,
                                codigoProduto: produto.codigoProduto,
                                valor: pedidoAtual.valor,
                                quantidadeEmEstoque: produto.qtd_estoque,
                                idPedido: pedidoAtual.id,
                                codigoPedido: pedidoAtual.codigoPedido,
                                quantidadePedido: pedidoAtual.quantidade,
                            }
                        });

                        const novoEstoque = await this.prismaService.produtos.update({
                            where: {
                                id: produto.id
                            },
                            data: {
                                qtd_estoque: produto.qtd_estoque - pedidoAtual.quantidade
                            }
                        });

                        const separacao = await this.prismaService.pedidos.update({
                            where: {
                                id: pedidoAtual.id
                            },
                            data: {
                                status: 'Separado'
                            }
                        });

                        if (novoEstoque && separacao) {
                            console.log(`Processamento do pedido ${pedidoAtual.codigoPedido} completo`);
                        }
                    }
                }


            }

            
        })
        
        return pedidosPorCliente.filter((pedido) => pedido.status == 'Importado').map((pedido)=> pedido.status = 'Separado')
        // throw new Error('Method not implemented.');
    }

    async criaMovimentacao(pedido) {
    
        const produto = await this.prismaService.produtos.findUnique({
            where: {
                id: pedido.produtos[0].produtoId
            }
        })

        if(produto.qtd_estoque >= pedido.quantidade) {
            const movimentacao = await this.prismaService.movimentacao_de_estoque.create({
                data: {
                    idProduto: produto.id,
                    codigoProduto: produto.codigoProduto,
                    valor: pedido.valor,
                    quantidadeEmEstoque: produto.qtd_estoque,
                    idPedido: pedido.id,
                    codigoPedido: pedido.codigoPedido,
                    quantidadePedido: pedido.quantidade,
                }
            })

            if(!movimentacao) {
                console.log("Estoque movimentado")
            }

            const novoEstoque = await this.prismaService.produtos.update({
                where: {
                    id: produto.id
                },
                data: {
                    qtd_estoque: produto.qtd_estoque - pedido.quantidade
                }
            });

            const separacao = await this.prismaService.pedidos.update({
                where: {
                    id: pedido.id
                },
                data: {
                    status: 'Separado'
                }
            })

            if(novoEstoque && separacao) {
                console.log(`Processamento do pedido ${pedido.codigoPedido} completo`)
            }


        } else {
            console.log(`A quantidade em estoque do produto ${produto.nomeProduto} não é o suficiente para atender ao pedido ${pedido.codigoPedido}`)
            const compras = await this.prismaService.compras.create({
                data: {
                    idProduto: produto.id,
                    codigoProduto: produto.codigoProduto,
                    quantidadeParaCompra: ((produto.qtd_estoque - pedido.quantidade) * -1)
                }
            })

            if(compras) {
                console.log(`Pendencia de compra do produto ${produto.nomeProduto} criada`)
            }
        }

    }
}

