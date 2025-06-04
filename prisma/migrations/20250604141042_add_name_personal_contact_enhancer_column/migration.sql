/*
  Warnings:

  - You are about to drop the column `ContactOwnerName` on the `contact_list` table. All the data in the column will be lost.
  - You are about to drop the column `MyId` on the `contact_list` table. All the data in the column will be lost.
  - Added the required column `IdPersonalContactEnhancer` to the `contact_List` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NamePersonalContactEnhancer` to the `contact_List` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `contact_list` DROP FOREIGN KEY `contact_List_MyId_fkey`;

-- AlterTable
ALTER TABLE `contact_list` DROP COLUMN `ContactOwnerName`,
    DROP COLUMN `MyId`,
    ADD COLUMN `IdPersonalContactEnhancer` VARCHAR(191) NOT NULL,
    ADD COLUMN `NamePersonalContactEnhancer` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `contact_List` ADD CONSTRAINT `contact_List_IdPersonalContactEnhancer_fkey` FOREIGN KEY (`IdPersonalContactEnhancer`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
