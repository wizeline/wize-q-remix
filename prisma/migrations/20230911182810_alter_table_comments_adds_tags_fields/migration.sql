-- AlterTable
ALTER TABLE "comments" 
ADD COLUMN  "tag_id"    INTEGER,
ADD COLUMN  "taggedby"  INTEGER;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "tagger" FOREIGN KEY ("taggedby") REFERENCES "users"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
