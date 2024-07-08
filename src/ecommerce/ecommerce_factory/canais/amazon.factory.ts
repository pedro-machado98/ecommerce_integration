import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { canais } from 'src/ecommerce/common/canais';
import { PedidoService } from 'src/pedido/pedido.service';
import { PrismaService } from 'src/prisma/prisma.service';

import { canaisInterface } from './interface/canais.interface';
import { Canal } from './types/canal.types';

@Injectable()
export class Amazon implements canaisInterface {

    private canal: Canal;
    private url: string

    constructor(
        private pedidoService: PedidoService,
        private readonly httpService: HttpService
    ) {
        this.canal = 'Amazon';
        this.url = `https://667c6d0f3c30891b865ca0c8.mockapi.io/api/v1/amazon`

    }


    async importarPedidos() {

        const request = this.httpService
        .get(this.url)
        .pipe(map((res)=> res.data))
        .pipe(
          catchError( () => {
            throw new ForbiddenException(`API não esta disponivel.`)
          }),
        );

        const pedidos = await lastValueFrom(request)


        // console.log(pedidos);

        for (let i=0 ; i < pedidos.length ; i++) {
            await this.pedidoService.createPedido(pedidos[i], this.canal)
        }

        // return pedidos.map(async (pedido) => {
        //     await this.pedidoService.createPedido(pedido, this.canal)
        // })

        return pedidos
    }
}
