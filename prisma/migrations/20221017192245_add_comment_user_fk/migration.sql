-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_created_by_employeeId` FOREIGN KEY (`userEmail`) REFERENCES `users`(`email`) ON DELETE NO ACTION ON UPDATE NO ACTION