-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "wizeq";

-- CreateTable
CREATE TABLE "embeddings" (
    "id" SERIAL NOT NULL,
    "embedding" vector(1536),
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "embeddings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "embeddings" ADD CONSTRAINT "embeddings_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;
