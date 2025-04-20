/*
  Warnings:

  - You are about to drop the column `history_id` on the `User_History` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,version]` on the table `User_History` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `entity_id` to the `User_History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job` to the `User_History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operation` to the `User_History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version` to the `User_History` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OperationType" AS ENUM ('create', 'update', 'delete');

-- AlterTable
ALTER TABLE "User_History" DROP COLUMN "history_id",
ADD COLUMN     "entity_id" BIGINT NOT NULL,
ADD COLUMN     "job" VARCHAR(255) NOT NULL,
ADD COLUMN     "operation" "OperationType" NOT NULL,
ADD COLUMN     "version" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_History_user_id_version_key" ON "User_History"("user_id", "version");
