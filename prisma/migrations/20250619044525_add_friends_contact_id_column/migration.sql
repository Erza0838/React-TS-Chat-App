/*
  Warnings:

  - Added the required column `Friends_Contact_Id` to the `personal_Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `personal_chat` ADD COLUMN `Friends_Contact_Id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `personal_Chat` ADD CONSTRAINT `personal_Chat_Friends_Contact_Id_fkey` FOREIGN KEY (`Friends_Contact_Id`) REFERENCES `contact_List`(`Contact_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
