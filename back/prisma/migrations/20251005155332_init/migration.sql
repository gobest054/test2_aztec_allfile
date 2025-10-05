-- CreateTable
CREATE TABLE `Data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inscl` VARCHAR(191) NOT NULL,
    `subinscl` VARCHAR(191) NOT NULL,
    `hmain` INTEGER NOT NULL,
    `hsub` INTEGER NOT NULL,
    `pttype` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
