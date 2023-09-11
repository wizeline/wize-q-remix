-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "tagger";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "taggedby" SET DATA TYPE TEXT;
