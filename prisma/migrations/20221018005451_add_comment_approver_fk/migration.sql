-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_approved_by_employeeId` FOREIGN KEY (`approvedBy`) REFERENCES `users`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
