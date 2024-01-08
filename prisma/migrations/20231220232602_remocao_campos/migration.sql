/*
  Warnings:

  - You are about to drop the column `calibre` on the `arma` table. All the data in the column will be lost.
  - You are about to drop the column `vitima` on the `crime` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `criminoso` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "arma" DROP COLUMN "calibre",
ALTER COLUMN "licenciada" SET DEFAULT 'S',
ALTER COLUMN "localizacao" DROP NOT NULL;

-- AlterTable
ALTER TABLE "crime" DROP COLUMN "vitima";

-- AlterTable
ALTER TABLE "criminoso" DROP COLUMN "estado";
