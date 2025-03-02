/*
  Warnings:

  - You are about to drop the column `Contacts_Id` on the `contact_list` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Contact_Id_References]` on the table `contact_List` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `contact_List_Contacts_Id_key` ON `contact_list`;

-- AlterTable
ALTER TABLE `contact_list` DROP COLUMN `Contacts_Id`;

-- CreateIndex
CREATE UNIQUE INDEX `contact_List_Contact_Id_References_key` ON `contact_List`(`Contact_Id_References`);
