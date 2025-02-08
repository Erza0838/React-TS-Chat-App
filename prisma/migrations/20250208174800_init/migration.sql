/*
  Warnings:

  - A unique constraint covering the columns `[Username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `DefaultUsername` to the `contact_List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contact_list` ADD COLUMN `ContactInformation` JSON NULL,
    ADD COLUMN `DefaultUsername` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_Username_key` ON `user`(`Username`);

-- AddForeignKey
ALTER TABLE `contact_List` ADD CONSTRAINT `contact_List_DefaultUsername_fkey` FOREIGN KEY (`DefaultUsername`) REFERENCES `user`(`Username`) ON DELETE RESTRICT ON UPDATE CASCADE;
