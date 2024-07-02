import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface Produto {
    id: number
    codigoProduto: string
    nomeProduto: string
    sku: bigint
    ean: bigint
    fabricante: string
}

@Injectable()
export class ProdutoService {

    constructor(private prismaService: PrismaService){}

    getAllProdutos() {
        throw new Error('Method not implemented.');
    }
    async getProduto(produtoPedido: Produto) {
        let produto: Produto;
        try {
            produto = await this.prismaService.produtos.findUnique({
                where: {
                    codigoProduto: produtoPedido.codigoProduto
                }
            })
    
            if(!produto) {
                return await this.createProduto(produtoPedido)
            }

            return produto

        } catch (err) {
            throw new Error('Erro ao criar o produto na tabela Produtos: ' + err);
        }

        throw new Error('Method not implemented.');
    }
    createProduto(produto: Produto) {

        try {
            const createdProduto = this.prismaService.produtos.create({
                data: {
                    codigoProduto: produto.codigoProduto,
                    nomeProduto: produto.nomeProduto,
                    sku: produto.sku,
                    ean: produto.ean,
                    fabricante: produto.fabricante,
                }
            })

            return createdProduto

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
