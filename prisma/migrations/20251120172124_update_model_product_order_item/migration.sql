-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_product_fkey` FOREIGN KEY (`product`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
