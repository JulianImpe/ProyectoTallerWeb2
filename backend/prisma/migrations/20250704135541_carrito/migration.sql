-- CreateTable
CREATE TABLE `Carrito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,

    UNIQUE INDEX `Carrito_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemCarrito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `carritoId` INTEGER NOT NULL,
    `productoId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Carrito` ADD CONSTRAINT `Carrito_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemCarrito` ADD CONSTRAINT `ItemCarrito_carritoId_fkey` FOREIGN KEY (`carritoId`) REFERENCES `Carrito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemCarrito` ADD CONSTRAINT `ItemCarrito_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
