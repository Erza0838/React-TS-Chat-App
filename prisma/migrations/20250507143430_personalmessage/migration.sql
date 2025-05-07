/*
  Warnings:

  - Added the required column `Personal_Chat_Owner_Id` to the `personal_Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `personal_chat` ADD COLUMN `Create_Personal_Message` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `Personal_Chat_Owner_Id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `personal_Chat` ADD CONSTRAINT `personal_Chat_Personal_Chat_Owner_Id_fkey` FOREIGN KEY (`Personal_Chat_Owner_Id`) REFERENCES `contact_List`(`Contact_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
