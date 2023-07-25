-- CreateTable
CREATE TABLE "admins" (
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "answers" (
    "answer_id" SERIAL NOT NULL,
    "answer_text" VARCHAR(3000) NOT NULL,
    "answered_by_picture" VARCHAR(255),
    "answer_date" TIMESTAMPTZ(6) NOT NULL,
    "answered_by_employee_id" INTEGER NOT NULL,
    "answered_question_id" INTEGER NOT NULL,
    "createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "num_scores" INTEGER DEFAULT 0,
    "average_score" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("answer_id")
);

-- CreateTable
CREATE TABLE "commentvote" (
    "id" SERIAL NOT NULL,
    "comment_id" INTEGER NOT NULL,
    "user" VARCHAR(255) NOT NULL,
    "value" SMALLINT NOT NULL,

    CONSTRAINT "commentvote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "comment" VARCHAR(3000),
    "createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questionid" INTEGER NOT NULL,
    "sessionhash" VARCHAR(255),
    "username" VARCHAR(255),
    "useremail" VARCHAR(255),
    "updatedat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "approvedby" INTEGER,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "department_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "manager_employee_id" INTEGER,
    "alternate_manager_id" INTEGER,
    "last_manager_email_notification_date" TIMESTAMPTZ(6),

    CONSTRAINT "departments_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "draftanswers" (
    "answer" VARCHAR(3000) NOT NULL,
    "employee_id" INTEGER NOT NULL DEFAULT 0,
    "question_id" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "draftanswers_pkey" PRIMARY KEY ("employee_id","question_id")
);

-- CreateTable
CREATE TABLE "employees" (
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "is_admin" BOOLEAN NOT NULL,
    "job_title" VARCHAR(255) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "employeesdepartments" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "department_id" INTEGER NOT NULL,
    "employee_id" INTEGER,

    CONSTRAINT "employeesdepartments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(255) NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "nps" (
    "answer_id" INTEGER NOT NULL DEFAULT 0,
    "user" VARCHAR(255),
    "score" INTEGER NOT NULL,
    "session_hash" VARCHAR(255) NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "nps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questiontags" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "questiontags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "question_id" SERIAL NOT NULL,
    "question" VARCHAR(500) NOT NULL,
    "user_hash" VARCHAR(255) NOT NULL DEFAULT '',
    "is_anonymous" BOOLEAN NOT NULL,
    "createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" VARCHAR(255) DEFAULT 'ALL',
    "last_email_notification_date" TIMESTAMPTZ(6),
    "assigned_department" INTEGER,
    "created_by_employee_id" INTEGER,
    "assigned_to_employee_id" INTEGER,
    "numcomments" INTEGER DEFAULT 0,
    "num_votes" INTEGER DEFAULT 0,
    "is_pinned" BOOLEAN NOT NULL DEFAULT false,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "sentiments" (
    "sentiment_id" SERIAL NOT NULL,
    "sentiment_question_id" INTEGER NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "score" DECIMAL(10,9) NOT NULL,

    CONSTRAINT "sentiments_pkey" PRIMARY KEY ("sentiment_id")
);

-- CreateTable
CREATE TABLE "tags" (
    "tag_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "votes" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER,
    "user" VARCHAR(255) NOT NULL,
    "is_upvote" BOOLEAN,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "sequelizemeta" (
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "sequelizemeta_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "locations_name_key" ON "locations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "name" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sequelizemeta_name_key" ON "sequelizemeta"("name");
