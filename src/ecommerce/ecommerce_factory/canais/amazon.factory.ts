import { Injectable } from '@nestjs/common';

import { canaisInterface } from './interface/canais.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { PedidoService } from 'src/pedido/pedido.service';

@Injectable()
export class Amazon implements canaisInterface {

    // constructor(private pedido: PedidoService ) {}


    importarPedidos(pedido: any) {

        console.log(pedido);

        

        throw new Error('Method not implemented.');
    }


}
