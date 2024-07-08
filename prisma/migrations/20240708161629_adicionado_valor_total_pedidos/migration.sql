/*
  Warnings:

  - Added the required column `valorTotal` to the `Pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pedidos" ADD COLUMN     "valorTotal" DECIMAL(10,3) NOT NULL;
