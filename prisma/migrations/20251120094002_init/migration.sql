/*
  Warnings:

  - You are about to alter the column `totalAmount` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `shippingFee` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `discountAmount` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `unitPrice` on the `orderitem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `subtotal` on the `orderitem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `amount` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `basePrice` on the `sablontype` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `pricePerColor` on the `sablontype` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `pricePerArea` on the `sablontype` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `totalAmount` INTEGER NOT NULL,
    MODIFY `shippingFee` INTEGER NULL,
    MODIFY `discountAmount` INTEGER NULL;

-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `costPrice` INTEGER NULL,
    ADD COLUMN `costTotal` INTEGER NULL,
    MODIFY `unitPrice` INTEGER NOT NULL,
    MODIFY `subtotal` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `amount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `sablontype` ADD COLUMN `baseCost` INTEGER NULL,
    ADD COLUMN `costPerArea` INTEGER NULL,
    ADD COLUMN `costPerColor` INTEGER NULL,
    MODIFY `basePrice` INTEGER NOT NULL,
    MODIFY `pricePerColor` INTEGER NULL,
    MODIFY `pricePerArea` INTEGER NULL;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sku` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NULL,
    `fileUrl` VARCHAR(191) NULL,
    `color` VARCHAR(191) NULL,
    `size` VARCHAR(191) NULL,
    `purchaseCost` INTEGER NOT NULL,
    `sellingPrice` INTEGER NULL,
    `stok` INTEGER NOT NULL DEFAULT 1,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Product_sku_key`(`sku`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfitLog` (
    `id` VARCHAR(191) NOT NULL,
    `orderItemId` VARCHAR(191) NOT NULL,
    `revenue` INTEGER NOT NULL,
    `cost` INTEGER NOT NULL,
    `profit` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Size` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `chest` INTEGER NULL,
    `length` INTEGER NULL,
    `sleeve` INTEGER NULL,
    `note` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProfitLog` ADD CONSTRAINT `ProfitLog_orderItemId_fkey` FOREIGN KEY (`orderItemId`) REFERENCES `OrderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
