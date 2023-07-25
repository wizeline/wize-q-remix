/*
  Warnings:

  - A unique constraint covering the columns `[answer_id,user]` on the table `nps` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[question_id,user]` on the table `votes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "answers_answered_by_employee_id_fkey" ON "answers"("answered_by_employee_id");

-- CreateIndex
CREATE INDEX "answers_answered_question_id_fkey" ON "answers"("answered_question_id");

-- CreateIndex
CREATE INDEX "questionid" ON "comments"("questionid");

-- CreateIndex
CREATE INDEX "comments_approved_by_employeeid" ON "comments"("approvedby");

-- CreateIndex
CREATE INDEX "comments_created_by_employeeid" ON "comments"("useremail");

-- CreateIndex
CREATE INDEX "comment_id" ON "commentvote"("comment_id");

-- CreateIndex
CREATE INDEX "departments_manager_employee_id" ON "departments"("manager_employee_id");

-- CreateIndex
CREATE INDEX "departments_alternate_manager_employee_id" ON "departments"("alternate_manager_id");

-- CreateIndex
CREATE INDEX "question_id" ON "draftanswers"("question_id");

-- CreateIndex
CREATE INDEX "employee_id_foreign_idx" ON "employeesdepartments"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_mail_with_answer" ON "nps"("answer_id", "user");

-- CreateIndex
CREATE INDEX "assigned_to_employee_id_foreign_idx" ON "questions"("assigned_to_employee_id");

-- CreateIndex
CREATE INDEX "created_by_employee_id_foreign_idx" ON "questions"("created_by_employee_id");

-- CreateIndex
CREATE INDEX "location" ON "questions"("location");

-- CreateIndex
CREATE INDEX "questions_assigned_department_fkey" ON "questions"("assigned_department");

-- CreateIndex
CREATE INDEX "sentiment_question_id" ON "sentiments"("sentiment_question_id");

-- CreateIndex
CREATE INDEX "users_email" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "unique_mail_with_question" ON "votes"("question_id", "user");

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answered_question_id" FOREIGN KEY ("answered_question_id") REFERENCES "questions"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answered_by_employee_id" FOREIGN KEY ("answered_by_employee_id") REFERENCES "users"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentvote" ADD CONSTRAINT "commentvote_ibfk_1" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "approver" FOREIGN KEY ("approvedby") REFERENCES "users"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "user" FOREIGN KEY ("useremail") REFERENCES "users"("email") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_ibfk_1" FOREIGN KEY ("questionid") REFERENCES "questions"("question_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_manager_employee_id_fkey" FOREIGN KEY ("manager_employee_id") REFERENCES "users"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_alternate_manager_id_fkey" FOREIGN KEY ("alternate_manager_id") REFERENCES "users"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "draftanswers" ADD CONSTRAINT "draftanswers_ibfk_1" FOREIGN KEY ("employee_id") REFERENCES "users"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "draftanswers" ADD CONSTRAINT "draftanswers_ibfk_2" FOREIGN KEY ("question_id") REFERENCES "questions"("question_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeesdepartments" ADD CONSTRAINT "employee_id" FOREIGN KEY ("employee_id") REFERENCES "users"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nps" ADD CONSTRAINT "nps_ibfk_1" FOREIGN KEY ("answer_id") REFERENCES "answers"("answer_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_ibfk_1" FOREIGN KEY ("location") REFERENCES "locations"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "assigned_to" FOREIGN KEY ("assigned_to_employee_id") REFERENCES "users"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "created_by" FOREIGN KEY ("created_by_employee_id") REFERENCES "users"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "department" FOREIGN KEY ("assigned_department") REFERENCES "departments"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentiments" ADD CONSTRAINT "sentiments_ibfk_1" FOREIGN KEY ("sentiment_question_id") REFERENCES "questions"("question_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_ibfk_1" FOREIGN KEY ("question_id") REFERENCES "questions"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;
