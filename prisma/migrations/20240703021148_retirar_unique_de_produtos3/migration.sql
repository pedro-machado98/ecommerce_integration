/*
  Warnings:

  - You are about to drop the `PedidoProduto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PedidoProduto" DROP CONSTRAINT "PedidoProduto_pedidoId_fkey";

-- DropForeignKey
ALTER TABLE "PedidoProduto" DROP CONSTRAINT "PedidoProduto_produtoId_fkey";

-- DropTable
DROP TABLE "PedidoProduto";

-- CreateTable
CREATE TABLE "_PedidosToProdutos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PedidosToProdutos_AB_unique" ON "_PedidosToProdutos"("A", "B");

-- CreateIndex
CREATE INDEX "_PedidosToProdutos_B_index" ON "_PedidosToProdutos"("B");

-- AddForeignKey
ALTER TABLE "_PedidosToProdutos" ADD CONSTRAINT "_PedidosToProdutos_A_fkey" FOREIGN KEY ("A") REFERENCES "Pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PedidosToProdutos" ADD CONSTRAINT "_PedidosToProdutos_B_fkey" FOREIGN KEY ("B") REFERENCES "Produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
