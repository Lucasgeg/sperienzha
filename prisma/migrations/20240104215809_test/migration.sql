/*
  Warnings:

  - You are about to drop the `critere_match` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_match_critere` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "critere_match" DROP CONSTRAINT "critere_match_id_critere_fkey";

-- DropForeignKey
ALTER TABLE "critere_match" DROP CONSTRAINT "critere_match_id_match_critere_fkey";

-- DropForeignKey
ALTER TABLE "user_match_critere" DROP CONSTRAINT "user_match_critere_id_user_fkey";

-- AlterTable
ALTER TABLE "critere" ADD COLUMN     "id_user" INTEGER;

-- AlterTable
ALTER TABLE "log" ALTER COLUMN "date" SET DEFAULT CURRENT_DATE;

-- AlterTable
ALTER TABLE "sanction" ALTER COLUMN "jour_sanction" SET DEFAULT CURRENT_DATE;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "date_inscription" SET DEFAULT CURRENT_DATE;

-- DropTable
DROP TABLE "critere_match";

-- DropTable
DROP TABLE "user_match_critere";

-- CreateTable
CREATE TABLE "UserCritere" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "critereId" INTEGER NOT NULL,

    CONSTRAINT "UserCritere_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCritere" ADD CONSTRAINT "UserCritere_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCritere" ADD CONSTRAINT "UserCritere_critereId_fkey" FOREIGN KEY ("critereId") REFERENCES "critere"("id_critere") ON DELETE RESTRICT ON UPDATE CASCADE;
