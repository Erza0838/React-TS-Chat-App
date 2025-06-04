/*
  Warnings:

  - Added the required column `IdPersonalContactReceiver` to the `contact_List` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NamePersonalContactReceiver` to the `contact_List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contact_list` ADD COLUMN `IdPersonalContactReceiver` VARCHAR(191) NOT NULL,
    ADD COLUMN `NamePersonalContactReceiver` VARCHAR(191) NOT NULL;
