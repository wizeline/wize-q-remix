-- CreateTable
CREATE TABLE `Admins` (
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Answers` (
    `answer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `answer_text` VARCHAR(3000) NOT NULL,
    `answered_by_picture` VARCHAR(255) NULL,
    `answer_date` DATETIME(0) NOT NULL,
    `answered_by_employee_id` INTEGER NOT NULL,
    `answered_question_id` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `num_scores` INTEGER NULL DEFAULT 0,
    `average_score` FLOAT NULL DEFAULT 0,

    PRIMARY KEY (`answer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommentVote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment_id` INTEGER NOT NULL,
    `user` VARCHAR(255) NOT NULL,
    `value` SMALLINT NOT NULL,

    INDEX `comment_id`(`comment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment` VARCHAR(3000) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `questionId` INTEGER NOT NULL,
    `sessionHash` VARCHAR(255) NULL,
    `userName` VARCHAR(255) NULL,
    `userEmail` VARCHAR(255) NULL,
    `updatedAt` DATETIME(0) NULL,
    `approvedBy` INTEGER NULL,

    INDEX `questionId`(`questionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departments` (
    `department_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`department_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DraftAnswers` (
    `answer` VARCHAR(255) NOT NULL,
    `employee_id` INTEGER NOT NULL DEFAULT 0,
    `question_id` INTEGER NOT NULL DEFAULT 0,

    INDEX `question_id`(`question_id`),
    PRIMARY KEY (`employee_id`, `question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employees` (
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `is_admin` BOOLEAN NOT NULL,
    `job_title` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployeesDepartments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `department_id` BOOLEAN NOT NULL,
    `employee_id` INTEGER NULL,

    INDEX `employee_id_foreign_idx`(`employee_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Locations` (
    `name` VARCHAR(255) NOT NULL,
    `code` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nps` (
    `answer_id` INTEGER NOT NULL DEFAULT 0,
    `user` VARCHAR(255) NULL,
    `score` INTEGER NOT NULL,
    `session_hash` VARCHAR(255) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `unique_mail_with_answer`(`answer_id`, `user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuestionTags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Questions` (
    `question_id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(500) NOT NULL,
    `user_hash` VARCHAR(255) NOT NULL,
    `is_anonymous` BOOLEAN NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `location` VARCHAR(255) NULL DEFAULT 'ALL',
    `last_email_notification_date` DATETIME(0) NULL,
    `assigned_department` INTEGER NULL,
    `created_by_employee_id` INTEGER NULL,
    `assigned_to_employee_id` INTEGER NULL,
    `numComments` INTEGER NULL DEFAULT 0,
    `num_votes` INTEGER NULL DEFAULT 0,
    `is_pinned` BOOLEAN NOT NULL,

    INDEX `assigned_to_employee_id_foreign_idx`(`assigned_to_employee_id`),
    INDEX `created_by_employee_id_foreign_idx`(`created_by_employee_id`),
    INDEX `location`(`location`),
    PRIMARY KEY (`question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sentiments` (
    `sentiment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sentiment_question_id` INTEGER NOT NULL,
    `label` VARCHAR(255) NOT NULL,
    `score` DECIMAL(10, 9) NOT NULL,

    INDEX `sentiment_question_id`(`sentiment_question_id`),
    PRIMARY KEY (`sentiment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tags` (
    `tag_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Votes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NULL,
    `user` VARCHAR(255) NOT NULL,
    `is_upvote` BOOLEAN NULL,

    UNIQUE INDEX `unique_mail_with_question`(`question_id`, `user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `employee_id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `is_admin` BOOLEAN NOT NULL DEFAULT false,
    `profile_picture` VARCHAR(255) NULL,
    `job_title` VARCHAR(255) NULL,

    UNIQUE INDEX `email`(`email`),
    INDEX `users_email`(`email`),
    PRIMARY KEY (`employee_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CommentVote` ADD CONSTRAINT `CommentVote_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `Comments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `Questions`(`question_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `DraftAnswers` ADD CONSTRAINT `DraftAnswers_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `users`(`employee_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DraftAnswers` ADD CONSTRAINT `DraftAnswers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `Questions`(`question_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeesDepartments` ADD CONSTRAINT `employee_id_foreign_idx` FOREIGN KEY (`employee_id`) REFERENCES `users`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Nps` ADD CONSTRAINT `Nps_ibfk_1` FOREIGN KEY (`answer_id`) REFERENCES `Answers`(`answer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Questions` ADD CONSTRAINT `Questions_ibfk_1` FOREIGN KEY (`location`) REFERENCES `Locations`(`code`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Questions` ADD CONSTRAINT `assigned_to_employee_id_foreign_idx` FOREIGN KEY (`assigned_to_employee_id`) REFERENCES `users`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Questions` ADD CONSTRAINT `created_by_employee_id_foreign_idx` FOREIGN KEY (`created_by_employee_id`) REFERENCES `users`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Sentiments` ADD CONSTRAINT `Sentiments_ibfk_1` FOREIGN KEY (`sentiment_question_id`) REFERENCES `Questions`(`question_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `Questions`(`question_id`) ON DELETE CASCADE ON UPDATE CASCADE;
