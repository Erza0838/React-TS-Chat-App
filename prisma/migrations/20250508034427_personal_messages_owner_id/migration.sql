/*
  Warnings:

  - A unique constraint covering the columns `[Personal_Chat_Owner_Id]` on the table `personal_Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `personal_Chat_Personal_Chat_Owner_Id_key` ON `personal_Chat`(`Personal_Chat_Owner_Id`);
