/*
  Warnings:

  - The primary key for the `personal_chat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Perconal_Chat_Id` on the `personal_chat` table. All the data in the column will be lost.
  - Added the required column `PersonalChatId` to the `contact_List` table without a default value. This is not possible if the table is not empty.
  - The required column `Personal_Chat_Id` was added to the `personal_Chat` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `personal_chat` DROP FOREIGN KEY `personal_Chat_Personal_Chat_Owner_Id_fkey`;

-- AlterTable
ALTER TABLE `contact_list` ADD COLUMN `PersonalChatId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `personal_chat` DROP PRIMARY KEY,
    DROP COLUMN `Perconal_Chat_Id`,
    ADD COLUMN `Personal_Chat_Id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`Personal_Chat_Id`);

-- AddForeignKey
ALTER TABLE `contact_List` ADD CONSTRAINT `contact_List_PersonalChatId_fkey` FOREIGN KEY (`PersonalChatId`) REFERENCES `personal_Chat`(`Personal_Chat_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `personal_Chat` ADD CONSTRAINT `personal_Chat_Personal_Chat_Owner_Id_fkey` FOREIGN KEY (`Personal_Chat_Owner_Id`) REFERENCES `contact_List`(`Contact_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
