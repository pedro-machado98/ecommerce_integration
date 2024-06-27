/*
  Warnings:

  - The values [RECEBIDO,SEPARADO,DESPACHADO,CONCLUIDO] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `canal` to the `Pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Canal" AS ENUM ('Amazon', 'Magalu', 'Meli');

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Recebido', 'Separado', 'Despachado', 'Entregue');
ALTER TABLE "Pedidos" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Pedidos" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Pedidos" ALTER COLUMN "status" SET DEFAULT 'Recebido';
COMMIT;

-- AlterTable
ALTER TABLE "Pedidos" ADD COLUMN     "canal" "Canal" NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Recebido';
