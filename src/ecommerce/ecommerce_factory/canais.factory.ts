import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { canais } from '../common/canais';
import { PedidoService } from './../../pedido/pedido.service';
import { Amazon, Magalu, Meli } from './canais/index';

@Injectable()
export class CanaisFactory {

    constructor(
        private pedidoService: PedidoService,
        private readonly httpService: HttpService
    ) {}

    create(canal) {
        switch (canal) {
            case canais.amz.name:
                return new Amazon(this.pedidoService, this.httpService)
            case canais.meli.name:
                return new Meli()
            case canais.mgl.name:
                return new Magalu()
            default:
                throw new Error(`Ecommerce não suportado: ${canal}`)
        }
    }

}
