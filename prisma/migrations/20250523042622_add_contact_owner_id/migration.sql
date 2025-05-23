/*
  Warnings:

  - You are about to drop the column `Personal_Chat_Owner_Id` on the `personal_chat` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Personal_Chat_Recipient_Id]` on the table `personal_Chat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Contact_Owner_Id` to the `personal_Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Personal_Chat_Recipient_Id` to the `personal_Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `personal_chat` DROP FOREIGN KEY `personal_Chat_Personal_Chat_Owner_Id_fkey`;

-- DropIndex
DROP INDEX `personal_Chat_Personal_Chat_Owner_Id_key` ON `personal_chat`;

-- AlterTable
ALTER TABLE `personal_chat` DROP COLUMN `Personal_Chat_Owner_Id`,
    ADD COLUMN `Contact_Owner_Id` VARCHAR(191) NOT NULL,
    ADD COLUMN `Personal_Chat_Recipient_Id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `personal_Chat_Personal_Chat_Recipient_Id_key` ON `personal_Chat`(`Personal_Chat_Recipient_Id`);

-- AddForeignKey
ALTER TABLE `personal_Chat` ADD CONSTRAINT `personal_Chat_Personal_Chat_Recipient_Id_fkey` FOREIGN KEY (`Personal_Chat_Recipient_Id`) REFERENCES `contact_List`(`Contact_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personal_Chat` ADD CONSTRAINT `personal_Chat_Contact_Owner_Id_fkey` FOREIGN KEY (`Contact_Owner_Id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
