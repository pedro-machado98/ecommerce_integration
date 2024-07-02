import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface Produto {
    codigoProduto: string
    nomeProduto: string
    sku: number
    ean: number
    fabricante: string
    qtd_estoque: number
}

@Injectable()
export class ProdutoService {

    constructor(private prismaService: PrismaService){}

    getAllProdutos() {
        throw new Error('Method not implemented.');
    }
    getProduto() {
        throw new Error('Method not implemented.');
    }
    createProduto(produto: Produto) {

        try {
            const createdCliente = this.prismaService.produtos.create({
                data: {
                    codigoProduto: produto.codigoProduto,
                    nomeProduto: produto.nomeProduto,
                    sku: produto.sku,
                    ean: produto.ean,
                    fabricante: produto.fabricante,
                    qtd_estoque: produto.qtd_estoque
                }
            })

        } catch (err) {
            throw new Error("Erro ao criar o produto. " + err);
        }

        throw new Error('Method not implemented.');

        throw new Error('Method not implemented.');
    }
    updateProduto() {
        throw new Error('Method not implemented.');
    }
    deleteProduto() {
        throw new Error('Method not implemented.');
    }
}
