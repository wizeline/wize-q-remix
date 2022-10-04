-- AddForeignKey
ALTER TABLE `Answers` ADD CONSTRAINT `Answers_answered_question_id_fkey` FOREIGN KEY (`answered_question_id`) REFERENCES `Questions`(`question_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
