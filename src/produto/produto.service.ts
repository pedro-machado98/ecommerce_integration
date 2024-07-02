import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface Produto {
    codigoProduto: string
    nomeProduto: string
    sku: number
    ean: number
    fabricante: string
}

@Injectable()
export class ProdutoService {

    constructor(private prismaService: PrismaService){}

    getAllProdutos() {
        throw new Error('Method not implemented.');
    }
    async getProduto(codigoProduto: string) {
        try {
            const produto = await this.prismaService.produtos.findUnique({
                where: {
                    codigoProduto: codigoProduto
                }
            })
    
            if(!produto) {
                return null
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
