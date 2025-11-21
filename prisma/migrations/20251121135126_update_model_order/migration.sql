/*
  Warnings:

  - Added the required column `noPayment` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `noPayment` INTEGER NOT NULL,
    ADD COLUMN `paymentMethod` VARCHAR(191) NOT NULL;
