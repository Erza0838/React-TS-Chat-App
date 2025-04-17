/*
  Warnings:

  - The primary key for the `personal_chat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Create_Personal_Message` on the `personal_chat` table. All the data in the column will be lost.
  - You are about to drop the column `Delete_Personal_Message` on the `personal_chat` table. All the data in the column will be lost.
  - You are about to drop the column `Existing_Contact_Id` on the `personal_chat` table. All the data in the column will be lost.
  - You are about to drop the column `Personal_Message_Id` on the `personal_chat` table. All the data in the column will be lost.
  - You are about to drop the column `Update_Personal_Message` on the `personal_chat` table. All the data in the column will be lost.
  - You are about to alter the column `My_Messages` on the `personal_chat` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.
  - You are about to alter the column `Messages_To_All` on the `personal_chat` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.
  - You are about to drop the `personal_chat_feature` table. If the table is not empty, all the data it contains will be lost.
  - The required column `Perconal_Chat_Id` was added to the `personal_Chat` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `personal_chat` DROP FOREIGN KEY `personal_Chat_Personal_Message_Id_fkey`;

-- AlterTable
ALTER TABLE `personal_chat` DROP PRIMARY KEY,
    DROP COLUMN `Create_Personal_Message`,
    DROP COLUMN `Delete_Personal_Message`,
    DROP COLUMN `Existing_Contact_Id`,
    DROP COLUMN `Personal_Message_Id`,
    DROP COLUMN `Update_Personal_Message`,
    ADD COLUMN `Perconal_Chat_Id` VARCHAR(191) NOT NULL,
    MODIFY `My_Messages` JSON NULL,
    MODIFY `Messages_To_All` JSON NULL,
    ADD PRIMARY KEY (`Perconal_Chat_Id`);

-- DropTable
DROP TABLE `personal_chat_feature`;
