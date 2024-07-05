/*
  Warnings:

  - A unique constraint covering the columns `[codigoPedido]` on the table `Pedidos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pedidos_codigoPedido_key" ON "Pedidos"("codigoPedido");
