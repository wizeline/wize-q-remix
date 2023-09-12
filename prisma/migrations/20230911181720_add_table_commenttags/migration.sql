-- CreateTable
CREATE TABLE "commenttags" (
    "tag_id" SERIAL NOT NULL,
    "tag_text" VARCHAR(255) NOT NULL,

    CONSTRAINT "commenttags_pkey" PRIMARY KEY ("tag_id")
);
