/*
  Warnings:

  - You are about to drop the `Data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Data`;

-- CreateTable
CREATE TABLE `Rights` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `INSCL` VARCHAR(191) NULL,
    `SUBINSCL` VARCHAR(191) NULL,
    `hmain` INTEGER NULL,
    `hsub` VARCHAR(191) NULL,
    `Rights_Name` VARCHAR(191) NULL,
    `PTTYPE` INTEGER NULL,
    `HOSxP_Rights` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
