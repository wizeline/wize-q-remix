-- AlterTable
ALTER TABLE `Departments` ADD COLUMN `alternate_manager_id` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Departments_alternate_manager_employee_id` ON `Departments`(`alternate_manager_id`);

-- AddForeignKey
ALTER TABLE `Departments` ADD CONSTRAINT `Departments_alternate_manager_id_fkey` FOREIGN KEY (`alternate_manager_id`) REFERENCES `users`(`employee_id`) ON DELETE SET NULL ON UPDATE CASCADE;
