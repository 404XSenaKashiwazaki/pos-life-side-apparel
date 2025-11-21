/*
  Warnings:

  - You are about to drop the column `pritAreas` on the `orderitem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `orderitem` DROP COLUMN `pritAreas`,
    ADD COLUMN `printAreas` VARCHAR(191) NULL;
