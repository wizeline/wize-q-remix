-- AddForeignKey
ALTER TABLE `Questions` ADD CONSTRAINT `Questions_assigned_department_fkey` FOREIGN KEY (`assigned_department`) REFERENCES `Departments`(`department_id`) ON DELETE SET NULL ON UPDATE CASCADE;
