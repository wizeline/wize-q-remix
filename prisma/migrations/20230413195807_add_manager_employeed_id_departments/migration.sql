/*
  Warnings:

  - Added the required column `manager_employee_id` to the `Departments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Departments` ADD COLUMN `manager_employee_id` INTEGER;
