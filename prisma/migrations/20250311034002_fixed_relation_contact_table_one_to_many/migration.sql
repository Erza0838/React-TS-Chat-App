/*
  Warnings:

  - You are about to drop the column `Contact_Id_References` on the `contact_list` table. All the data in the column will be lost.
  - The required column `Contact_Id` was added to the `contact_List` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `MyId` to the `contact_List` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `contact_list` DROP FOREIGN KEY `contact_List_Contact_Id_References_fkey`;

-- DropIndex
DROP INDEX `contact_List_Contact_Id_References_key` ON `contact_list`;

-- AlterTable
ALTER TABLE `contact_list` DROP COLUMN `Contact_Id_References`,
    ADD COLUMN `Contact_Id` VARCHAR(191) NOT NULL,
    ADD COLUMN `MyId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`Contact_Id`);

-- AddForeignKey
ALTER TABLE `contact_List` ADD CONSTRAINT `contact_List_MyId_fkey` FOREIGN KEY (`MyId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
