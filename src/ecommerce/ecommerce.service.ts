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
  ) {}

  async importarPedidos(canal : string) {

    const ecommerce = this.canalFactory.create(canal)

    const pedidos = await ecommerce.importarPedidos()
    
    return {
      data: {
        pedidos
      }
    }
  }


}
