/*
  Warnings:

  - You are about to drop the column `Personal_Chat_Recipient_Id` on the `personal_chat` table. All the data in the column will be lost.
  - Added the required column `ContactOwnerName` to the `contact_List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contact_list` ADD COLUMN `ContactOwnerName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `personal_chat` DROP COLUMN `Personal_Chat_Recipient_Id`;
