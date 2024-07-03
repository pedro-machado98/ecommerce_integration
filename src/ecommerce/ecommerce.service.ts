import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { ProdutoService } from 'src/produto/produto.service';

import { ClienteService } from './../cliente/cliente.service';
import { PrismaService } from './../prisma/prisma.service';
import { Amazon } from './ecommerce_factory/canais';
import { CanaisFactory } from './ecommerce_factory/canais.factory';

@Injectable()
export class EcommerceService {

  private readonly urlCanal: string;
  
  constructor(
    private readonly httpService: HttpService,
    private canalFactory: CanaisFactory,
    private prismaService: PrismaService,
    private ClienteService: ClienteService,
    private produtoService: ProdutoService
    // private amazon: Amazon
  ) {
    /** REFACT
     * essa url vai para o dominio ecommerce_amazon
     */
    this.urlCanal = `https://667c6d0f3c30891b865ca0c8.mockapi.io/api/v1/amazon`
  }

  async importarPedidos(canal : string) {

    const ecommerce = this.canalFactory.create(canal)
    /** REFACT
     * Essa requisição vai para o dominio ecommerce_amazon
     * Para esta função resta apenas orquestrar de quais ecommerces estamos importando.
     */
    const request = this.httpService
    .get(this.urlCanal)
    .pipe(map((res)=> res.data))
    .pipe(
      catchError( () => {
        throw new ForbiddenException(`API não esta disponivel.`)
      }),
    );


    const pedidos = await lastValueFrom(request)

    ecommerce.importarPedidos(pedidos)
    
    return {
      data: {
        pedidos : pedidos
      }
    }
  }


}
