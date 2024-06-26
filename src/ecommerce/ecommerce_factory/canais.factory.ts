import { Injectable } from '@nestjs/common';
import { canais } from '../common/canais';
import { Amazon, Meli, Magalu } from './canais/index';


@Injectable()
export class CanaisFactory {
    create(canal) {
        switch (canal) {
            case canais.amz:
                return new Amazon()
            case canais.meli:
                return new Meli()
            case canais.mgl:
                return new Magalu()
            default:
                throw new Error(`Ecommerce não suportado: ${canal}`)
        }
    }

}
