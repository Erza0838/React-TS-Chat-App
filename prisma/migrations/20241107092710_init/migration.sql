-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `Genders` CHAR(100) NOT NULL,
    `Email` VARCHAR(100) NOT NULL,
    `Username` VARCHAR(100) NOT NULL,
    `Password` VARCHAR(100) NOT NULL,
    `UserProfilePicture` VARCHAR(255) NULL,

    UNIQUE INDEX `user_Password_key`(`Password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserDescription` (
    `UserDescriptionId` VARCHAR(191) NOT NULL,
    `UserDescription` VARCHAR(255) NOT NULL,
    `UserId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`UserDescriptionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_List` (
    `Contacts_Id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `contact_List_Contacts_Id_key`(`Contacts_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personal_Chat_Feature` (
    `Personal_Messages_Id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Personal_Messages_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personal_Chat` (
    `Existing_Contact_Id` VARCHAR(191) NOT NULL,
    `Personal_Message_Id` VARCHAR(255) NOT NULL,
    `My_Messages` TEXT NOT NULL,
    `Messages_To_All` TEXT NOT NULL,
    `Delete_Personal_Message` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Update_Personal_Message` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Create_Personal_Message` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`Existing_Contact_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grup_Chat_Feature` (
    `Grup_Messages_Id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Grup_Messages_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grup_chat_information` (
    `Chat_Grup_Id` VARCHAR(191) NOT NULL,
    `Grup_Chat_Information_Id` VARCHAR(191) NOT NULL,
    `Grup_Name` VARCHAR(40) NOT NULL,
    `Grup_Description` VARCHAR(255) NULL,
    `Role_member` VARCHAR(255) NOT NULL,
    `GrupProfilePicture` VARCHAR(255) NULL,
    `Messages_Admin_And_Member` TEXT NOT NULL,
    `Messages_To_All` TEXT NOT NULL,
    `Delete_Grup_Message` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Update_Grup_Message` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Create_Grup_Message` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`Grup_Chat_Information_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grup_list_member` (
    `List_Id_Grup_Members` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`List_Id_Grup_Members`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserDescription` ADD CONSTRAINT `UserDescription_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact_List` ADD CONSTRAINT `contact_List_Contacts_Id_fkey` FOREIGN KEY (`Contacts_Id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personal_Chat` ADD CONSTRAINT `personal_Chat_Existing_Contact_Id_fkey` FOREIGN KEY (`Existing_Contact_Id`) REFERENCES `contact_List`(`Contacts_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personal_Chat` ADD CONSTRAINT `personal_Chat_Personal_Message_Id_fkey` FOREIGN KEY (`Personal_Message_Id`) REFERENCES `personal_Chat_Feature`(`Personal_Messages_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grup_chat_information` ADD CONSTRAINT `grup_chat_information_Chat_Grup_Id_fkey` FOREIGN KEY (`Chat_Grup_Id`) REFERENCES `Grup_Chat_Feature`(`Grup_Messages_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grup_list_member` ADD CONSTRAINT `grup_list_member_List_Id_Grup_Members_fkey` FOREIGN KEY (`List_Id_Grup_Members`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
