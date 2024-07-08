import { Injectable } from '@nestjs/common';

import { canaisInterface } from './interface/canais.interface';

@Injectable()
export class Meli implements canaisInterface {
    importarPedidos() {
        throw new Error('Method not implemented.');
    }

}
