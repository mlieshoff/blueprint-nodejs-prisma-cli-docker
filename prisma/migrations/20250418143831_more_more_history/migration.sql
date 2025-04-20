/*
  Warnings:

  - You are about to drop the column `user_id` on the `User_History` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[entity_id,version]` on the table `User_History` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User_History" DROP CONSTRAINT "User_History_user_id_fkey";

-- DropIndex
DROP INDEX "User_History_user_id_idx";

-- DropIndex
DROP INDEX "User_History_user_id_version_key";

-- AlterTable
ALTER TABLE "User_History" DROP COLUMN "user_id";

-- CreateIndex
CREATE INDEX "User_History_entity_id_idx" ON "User_History"("entity_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_History_entity_id_version_key" ON "User_History"("entity_id", "version");

-- AddForeignKey
ALTER TABLE "User_History" ADD CONSTRAINT "User_History_entity_id_fkey" FOREIGN KEY ("entity_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
