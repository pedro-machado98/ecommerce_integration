/*
  Warnings:

  - A unique constraint covering the columns `[codigoProduto]` on the table `Produtos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Produtos_codigoProduto_key" ON "Produtos"("codigoProduto");
