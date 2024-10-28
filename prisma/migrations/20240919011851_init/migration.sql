/*
  Warnings:

  - A unique constraint covering the columns `[Password]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_Password_key` ON `user`(`Password`);
