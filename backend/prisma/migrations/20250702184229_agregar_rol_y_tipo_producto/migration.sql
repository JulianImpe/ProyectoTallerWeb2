/*
  Warnings:

  - You are about to drop the column `tipoProducto` on the `producto` table. All the data in the column will be lost.
  - Added the required column `tipoProductoId` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rol` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `producto` DROP COLUMN `tipoProducto`,
    ADD COLUMN `tipoProductoId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `rol` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `TipoProducto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TipoProducto_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_tipoProductoId_fkey` FOREIGN KEY (`tipoProductoId`) REFERENCES `TipoProducto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
