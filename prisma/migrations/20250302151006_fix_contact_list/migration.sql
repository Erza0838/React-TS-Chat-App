/*
  Warnings:

  - You are about to drop the column `DefaultUsername` on the `contact_list` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `contact_List_DefaultUsername_fkey` ON `contact_list`;

-- AlterTable
ALTER TABLE `contact_list` DROP COLUMN `DefaultUsername`;
