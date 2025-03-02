/*
  Warnings:

  - Added the required column `Contact_Id_References` to the `contact_List` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `contact_list` DROP FOREIGN KEY `contact_List_Contacts_Id_fkey`;

-- DropForeignKey
ALTER TABLE `contact_list` DROP FOREIGN KEY `contact_List_DefaultUsername_fkey`;

-- DropForeignKey
ALTER TABLE `personal_chat` DROP FOREIGN KEY `personal_Chat_Existing_Contact_Id_fkey`;

-- AlterTable
ALTER TABLE `contact_list` ADD COLUMN `Contact_Id_References` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `contact_List` ADD CONSTRAINT `contact_List_Contact_Id_References_fkey` FOREIGN KEY (`Contact_Id_References`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
