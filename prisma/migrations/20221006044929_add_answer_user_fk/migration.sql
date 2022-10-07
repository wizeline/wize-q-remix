-- AddForeignKey
ALTER TABLE `Answers` ADD CONSTRAINT `Answers_answered_by_employee_id_fkey` FOREIGN KEY (`answered_by_employee_id`) REFERENCES `users`(`employee_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
