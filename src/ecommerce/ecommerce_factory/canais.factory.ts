import { PedidoService } from './../../pedido/pedido.service';
import { Injectable } from '@nestjs/common';
import { canais } from '../common/canais';
import { Amazon, Meli, Magalu } from './canais/index';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CanaisFactory {

    // constructor(private pedidoService: PedidoService) {}

    create(canal) {
        switch (canal) {
            case canais.amz.name:
                return new Amazon()
            case canais.meli.name:
                return new Meli()
            case canais.mgl.name:
                return new Magalu()
            default:
                throw new Error(`Ecommerce não suportado: ${canal}`)
        }
    }

}
