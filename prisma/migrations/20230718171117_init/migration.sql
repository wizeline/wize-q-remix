-- CreateTable
CREATE TABLE "Admins" (
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Answers" (
    "answer_id" SERIAL NOT NULL,
    "answer_text" VARCHAR(3000) NOT NULL,
    "answered_by_picture" VARCHAR(255),
    "answer_date" TIMESTAMP NOT NULL,
    "answered_by_employee_id" INTEGER NOT NULL,
    "answered_question_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "num_scores" INTEGER DEFAULT 0,
    "average_score" REAL DEFAULT 0,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("answer_id")
);

-- CreateTable
CREATE TABLE "CommentVote" (
    "id" SERIAL NOT NULL,
    "comment_id" INTEGER NOT NULL,
    "user" VARCHAR(255) NOT NULL,
    "value" SMALLINT NOT NULL,

    CONSTRAINT "CommentVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "comment" VARCHAR(3000),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questionId" INTEGER NOT NULL,
    "sessionHash" VARCHAR(255),
    "userName" VARCHAR(255),
    "userEmail" VARCHAR(255),
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "approvedBy" INTEGER,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "department_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "manager_employee_id" INTEGER,
    "alternate_manager_id" INTEGER,
    "last_manager_email_notification_date" TIMESTAMP,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "DraftAnswers" (
    "answer" VARCHAR(255) NOT NULL,
    "employee_id" INTEGER NOT NULL DEFAULT 0,
    "question_id" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DraftAnswers_pkey" PRIMARY KEY ("employee_id","question_id")
);

-- CreateTable
CREATE TABLE "Employees" (
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "is_admin" BOOLEAN NOT NULL,
    "job_title" VARCHAR(255) NOT NULL,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "EmployeesDepartments" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "department_id" INTEGER NOT NULL,
    "employee_id" INTEGER,

    CONSTRAINT "EmployeesDepartments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Locations" (
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(255) NOT NULL,

    CONSTRAINT "Locations_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Nps" (
    "answer_id" INTEGER NOT NULL DEFAULT 0,
    "user" VARCHAR(255),
    "score" INTEGER NOT NULL,
    "session_hash" VARCHAR(255) NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Nps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionTags" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "QuestionTags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "question_id" SERIAL NOT NULL,
    "question" VARCHAR(500) NOT NULL,
    "user_hash" VARCHAR(255) NOT NULL DEFAULT '',
    "is_anonymous" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" VARCHAR(255) DEFAULT 'ALL',
    "last_email_notification_date" TIMESTAMP,
    "assigned_department" INTEGER,
    "created_by_employee_id" INTEGER,
    "assigned_to_employee_id" INTEGER,
    "numComments" INTEGER DEFAULT 0,
    "num_votes" INTEGER DEFAULT 0,
    "is_pinned" BOOLEAN NOT NULL DEFAULT false,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "Sentiments" (
    "sentiment_id" SERIAL NOT NULL,
    "sentiment_question_id" INTEGER NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "score" DECIMAL(10,9) NOT NULL,

    CONSTRAINT "Sentiments_pkey" PRIMARY KEY ("sentiment_id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "tag_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "Votes" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER,
    "user" VARCHAR(255) NOT NULL,
    "is_upvote" BOOLEAN,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "employee_id" SERIAL NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "profile_picture" VARCHAR(255),
    "job_title" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("employee_id")
);

-- CreateIndex
CREATE INDEX "Answers_answered_by_employee_id_fkey" ON "Answers"("answered_by_employee_id");

-- CreateIndex
CREATE INDEX "Answers_answered_question_id_fkey" ON "Answers"("answered_question_id");

-- CreateIndex
CREATE INDEX "comment_id" ON "CommentVote"("comment_id");

-- CreateIndex
CREATE INDEX "questionId" ON "Comments"("questionId");

-- CreateIndex
CREATE INDEX "Comments_approved_by_employeeId" ON "Comments"("approvedBy");

-- CreateIndex
CREATE INDEX "Comments_created_by_employeeId" ON "Comments"("userEmail");

-- CreateIndex
CREATE INDEX "Departments_manager_employee_id" ON "Departments"("manager_employee_id");

-- CreateIndex
CREATE INDEX "Departments_alternate_manager_employee_id" ON "Departments"("alternate_manager_id");

-- CreateIndex
CREATE INDEX "question_id" ON "DraftAnswers"("question_id");

-- CreateIndex
CREATE INDEX "employee_id_foreign_idx" ON "EmployeesDepartments"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "Locations_name_key" ON "Locations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "unique_mail_with_answer" ON "Nps"("answer_id", "user");

-- CreateIndex
CREATE INDEX "assigned_to_employee_id_foreign_idx" ON "Questions"("assigned_to_employee_id");

-- CreateIndex
CREATE INDEX "created_by_employee_id_foreign_idx" ON "Questions"("created_by_employee_id");

-- CreateIndex
CREATE INDEX "location" ON "Questions"("location");

-- CreateIndex
CREATE INDEX "Questions_assigned_department_fkey" ON "Questions"("assigned_department");

-- CreateIndex
CREATE INDEX "sentiment_question_id" ON "Sentiments"("sentiment_question_id");

-- CreateIndex
CREATE UNIQUE INDEX "name" ON "Tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "unique_mail_with_question" ON "Votes"("question_id", "user");

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "answered_question_id" FOREIGN KEY ("answered_question_id") REFERENCES "Questions"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "answered_by_employee_id" FOREIGN KEY ("answered_by_employee_id") REFERENCES "users"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentVote" ADD CONSTRAINT "CommentVote_ibfk_1" FOREIGN KEY ("comment_id") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Approver" FOREIGN KEY ("approvedBy") REFERENCES "users"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "User" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_ibfk_1" FOREIGN KEY ("questionId") REFERENCES "Questions"("question_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Departments" ADD CONSTRAINT "Departments_manager_employee_id_fkey" FOREIGN KEY ("manager_employee_id") REFERENCES "users"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departments" ADD CONSTRAINT "Departments_alternate_manager_id_fkey" FOREIGN KEY ("alternate_manager_id") REFERENCES "users"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftAnswers" ADD CONSTRAINT "DraftAnswers_ibfk_1" FOREIGN KEY ("employee_id") REFERENCES "users"("employee_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftAnswers" ADD CONSTRAINT "DraftAnswers_ibfk_2" FOREIGN KEY ("question_id") REFERENCES "Questions"("question_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeesDepartments" ADD CONSTRAINT "employee_id" FOREIGN KEY ("employee_id") REFERENCES "users"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Nps" ADD CONSTRAINT "Nps_ibfk_1" FOREIGN KEY ("answer_id") REFERENCES "Answers"("answer_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_ibfk_1" FOREIGN KEY ("location") REFERENCES "Locations"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "assigned_to" FOREIGN KEY ("assigned_to_employee_id") REFERENCES "users"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "created_by" FOREIGN KEY ("created_by_employee_id") REFERENCES "users"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Department" FOREIGN KEY ("assigned_department") REFERENCES "Departments"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sentiments" ADD CONSTRAINT "Sentiments_ibfk_1" FOREIGN KEY ("sentiment_question_id") REFERENCES "Questions"("question_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_ibfk_1" FOREIGN KEY ("question_id") REFERENCES "Questions"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;
