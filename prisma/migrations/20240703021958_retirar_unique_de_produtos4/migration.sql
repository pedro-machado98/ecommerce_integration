/*
  Warnings:

  - You are about to drop the `_PedidosToProdutos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PedidosToProdutos" DROP CONSTRAINT "_PedidosToProdutos_A_fkey";

-- DropForeignKey
ALTER TABLE "_PedidosToProdutos" DROP CONSTRAINT "_PedidosToProdutos_B_fkey";

-- DropTable
DROP TABLE "_PedidosToProdutos";

-- CreateTable
CREATE TABLE "PedidoProduto" (
    "pedidoId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,

    CONSTRAINT "PedidoProduto_pkey" PRIMARY KEY ("pedidoId","produtoId")
);

-- AddForeignKey
ALTER TABLE "PedidoProduto" ADD CONSTRAINT "PedidoProduto_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoProduto" ADD CONSTRAINT "PedidoProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
