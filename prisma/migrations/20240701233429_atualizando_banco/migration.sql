/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Pedidos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Produtos` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Compras" DROP CONSTRAINT "Compras_idProduto_codigoProduto_fkey";

-- DropForeignKey
ALTER TABLE "Movimentacao_de_estoque" DROP CONSTRAINT "Movimentacao_de_estoque_idPedido_codigoPedido_fkey";

-- DropForeignKey
ALTER TABLE "Movimentacao_de_estoque" DROP CONSTRAINT "Movimentacao_de_estoque_idProduto_codigoProduto_fkey";

-- DropForeignKey
ALTER TABLE "Pedidos" DROP CONSTRAINT "Pedidos_idCliente_codigoCliente_fkey";

-- DropForeignKey
ALTER TABLE "Pedidos" DROP CONSTRAINT "Pedidos_idProduto_codigoProduto_fkey";

-- DropIndex
DROP INDEX "Clientes_id_codigoCliente_key";

-- DropIndex
DROP INDEX "Pedidos_id_codigoPedido_key";

-- DropIndex
DROP INDEX "Produtos_id_codigoProduto_key";

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_id_key" ON "Clientes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pedidos_id_key" ON "Pedidos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Produtos_id_key" ON "Produtos"("id");

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compras" ADD CONSTRAINT "Compras_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimentacao_de_estoque" ADD CONSTRAINT "Movimentacao_de_estoque_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimentacao_de_estoque" ADD CONSTRAINT "Movimentacao_de_estoque_idPedido_fkey" FOREIGN KEY ("idPedido") REFERENCES "Pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
