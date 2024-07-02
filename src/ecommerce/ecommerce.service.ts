import { PrismaService } from './../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';

import { Amazon } from './ecommerce_factory/canais';
import { CanaisFactory } from './ecommerce_factory/canais.factory';

@Injectable()
export class EcommerceService {

  private readonly urlCanal: string;
  
  constructor(
    private readonly httpService: HttpService,
    private canalFactory: CanaisFactory,
    private prismaService: PrismaService
    // private amazon: Amazon
  ) {
    this.urlCanal = `https://667c6d0f3c30891b865ca0c8.mockapi.io/api/v1/amazon`
  }

  async importarPedidos(canal : string) {

    const ecommerce = this.canalFactory.create(canal)

    const request = this.httpService
    .get(this.urlCanal)
    .pipe(map((res)=> res.data))
    .pipe(
      catchError( () => {
        throw new ForbiddenException(`API não esta disponivel.`)
      }),
    );

    

    const pedido = await lastValueFrom(request)

    ecommerce.importarPedidos(pedido)


    return {
      data: {
        pedidos : pedido
      }
    }
  }


}
