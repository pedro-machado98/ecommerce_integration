import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

//torna o modulo disponivel para todos os modulos consumirem
//deixe importado no app.module
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
