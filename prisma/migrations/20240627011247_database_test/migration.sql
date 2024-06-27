/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('RECEBIDO', 'SEPARADO', 'DESPACHADO', 'CONCLUIDO');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Clientes" (
    "id" SERIAL NOT NULL,
    "codigoCliente" INTEGER NOT NULL,
    "nomeCliente" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "pais" TEXT NOT NULL,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produtos" (
    "id" SERIAL NOT NULL,
    "codigoProduto" TEXT NOT NULL,
    "nomeProduto" TEXT NOT NULL,
    "sku" BIGINT NOT NULL,
    "ean" BIGINT NOT NULL,
    "fabricante" TEXT NOT NULL,
    "qtd_estoque" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "Produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedidos" (
    "id" SERIAL NOT NULL,
    "codigoPedido" INTEGER NOT NULL,
    "valor" DECIMAL(10,3) NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "idProduto" INTEGER NOT NULL,
    "codigoProduto" TEXT NOT NULL,
    "idCliente" INTEGER NOT NULL,
    "codigoCliente" INTEGER NOT NULL,
    "endereco" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'RECEBIDO',

    CONSTRAINT "Pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Compras" (
    "id" SERIAL NOT NULL,
    "idProduto" INTEGER NOT NULL,
    "codigoProduto" TEXT NOT NULL,
    "quantidadeParaCompra" INTEGER NOT NULL,

    CONSTRAINT "Compras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movimentacao_de_estoque" (
    "id" SERIAL NOT NULL,
    "idProduto" INTEGER NOT NULL,
    "codigoProduto" TEXT NOT NULL,
    "valor" DECIMAL(10,3) NOT NULL,
    "quantidadeEmEstoque" INTEGER NOT NULL,
    "idPedido" INTEGER NOT NULL,
    "codigoPedido" INTEGER NOT NULL,
    "quantidadePedido" INTEGER NOT NULL,

    CONSTRAINT "Movimentacao_de_estoque_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_id_codigoCliente_key" ON "Clientes"("id", "codigoCliente");

-- CreateIndex
CREATE UNIQUE INDEX "Produtos_id_codigoProduto_key" ON "Produtos"("id", "codigoProduto");

-- CreateIndex
CREATE UNIQUE INDEX "Pedidos_id_codigoPedido_key" ON "Pedidos"("id", "codigoPedido");

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_idProduto_codigoProduto_fkey" FOREIGN KEY ("idProduto", "codigoProduto") REFERENCES "Produtos"("id", "codigoProduto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_idCliente_codigoCliente_fkey" FOREIGN KEY ("idCliente", "codigoCliente") REFERENCES "Clientes"("id", "codigoCliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compras" ADD CONSTRAINT "Compras_idProduto_codigoProduto_fkey" FOREIGN KEY ("idProduto", "codigoProduto") REFERENCES "Produtos"("id", "codigoProduto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimentacao_de_estoque" ADD CONSTRAINT "Movimentacao_de_estoque_idProduto_codigoProduto_fkey" FOREIGN KEY ("idProduto", "codigoProduto") REFERENCES "Produtos"("id", "codigoProduto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimentacao_de_estoque" ADD CONSTRAINT "Movimentacao_de_estoque_idPedido_codigoPedido_fkey" FOREIGN KEY ("idPedido", "codigoPedido") REFERENCES "Pedidos"("id", "codigoPedido") ON DELETE RESTRICT ON UPDATE CASCADE;
