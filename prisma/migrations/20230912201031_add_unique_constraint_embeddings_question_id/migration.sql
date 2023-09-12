/*
  Warnings:

  - A unique constraint covering the columns `[question_id]` on the table `embeddings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "embeddings_question_id_key" ON "embeddings"("question_id");
