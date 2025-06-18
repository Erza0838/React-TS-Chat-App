/*
  Warnings:

  - You are about to drop the column `Contact_Owner_Id` on the `personal_chat` table. All the data in the column will be lost.
  - You are about to drop the column `FriendContactId` on the `personal_chat` table. All the data in the column will be lost.
  - Added the required column `Personal_Contact_Enhancer_Id` to the `personal_Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Personal_Contact_Receiver_Id` to the `personal_Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `personal_chat` DROP FOREIGN KEY `personal_Chat_Contact_Owner_Id_fkey`;

-- AlterTable
ALTER TABLE `personal_chat` DROP COLUMN `Contact_Owner_Id`,
    DROP COLUMN `FriendContactId`,
    ADD COLUMN `Personal_Contact_Enhancer_Id` VARCHAR(191) NOT NULL,
    ADD COLUMN `Personal_Contact_Receiver_Id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `personal_Chat` ADD CONSTRAINT `personal_Chat_Personal_Contact_Enhancer_Id_fkey` FOREIGN KEY (`Personal_Contact_Enhancer_Id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
