-- CreateIndex
CREATE INDEX `Departments_manager_employee_id` ON `Departments`(`manager_employee_id`);

-- AddForeignKey
ALTER TABLE `Departments` ADD CONSTRAINT `Departments_manager_employee_id_fkey` FOREIGN KEY (`manager_employee_id`) REFERENCES `users`(`employee_id`) ON DELETE SET NULL ON UPDATE CASCADE;
