/*
  Warnings:

  - The values [Recebido] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[codigoCliente]` on the table `Clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigoPedido]` on the table `Pedidos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigoProduto]` on the table `Produtos` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Importado', 'Separado', 'Despachado', 'Entregue');
ALTER TABLE "Pedidos" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Pedidos" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Pedidos" ALTER COLUMN "status" SET DEFAULT 'Importado';
COMMIT;

-- AlterTable
ALTER TABLE "Pedidos" ALTER COLUMN "status" SET DEFAULT 'Importado';

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_codigoCliente_key" ON "Clientes"("codigoCliente");

-- CreateIndex
CREATE UNIQUE INDEX "Pedidos_codigoPedido_key" ON "Pedidos"("codigoPedido");

-- CreateIndex
CREATE UNIQUE INDEX "Produtos_codigoProduto_key" ON "Produtos"("codigoProduto");
