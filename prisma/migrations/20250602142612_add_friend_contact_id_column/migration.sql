/*
  Warnings:

  - Added the required column `FriendContactId` to the `personal_Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `personal_chat` ADD COLUMN `FriendContactId` VARCHAR(191) NOT NULL;
