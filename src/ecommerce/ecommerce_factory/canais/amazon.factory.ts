import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { canais } from 'src/ecommerce/common/canais';
import { PedidoService } from 'src/pedido/pedido.service';
import { PrismaService } from 'src/prisma/prisma.service';

import { canaisInterface } from './interface/canais.interface';
import { Canal } from './types/canal.types';

@Injectable()
export class Amazon implements canaisInterface {

    private canal: Canal;

    constructor(private pedidoService: PedidoService ) {
        this.canal = 'Amazon';
    }


    importarPedidos(pedidos: any) {

        // console.log(pedidos);

        pedidos.map((pedido) => {
            this.pedidoService.createPedido(pedido, this.canal)
        })
    }
}
