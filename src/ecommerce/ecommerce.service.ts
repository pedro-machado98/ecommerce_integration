import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class EcommerceService {

  private readonly urlCanal: string;
  
  constructor(
    private readonly httpService: HttpService,
  ) {
    
    this.urlCanal = `https://667c6d0f3c30891b865ca0c8.mockapi.io/api/v1/amazon`
  }

  async importarPedidos() {
    const request = this.httpService
    .get(this.urlCanal)
    .pipe(map((res)=> res.data))
    .pipe(
      catchError( () => {
        throw new ForbiddenException(`API não esta disponivel.`)
      }),
    );

    const pedido = await lastValueFrom(request)

    return {
      data: {
        pedidos : pedido
      }
    }
  }

}
