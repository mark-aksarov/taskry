-- CreateEnum
CREATE TYPE "public"."NotificationType" AS ENUM ('TASK_ADDED', 'TASK_DELETED', 'TASK_UPDATED', 'TASK_COMMENTED', 'PROJECT_ADDED', 'PROJECT_DELETED', 'PROJECT_UPDATED', 'PROJECT_COMMENTED', 'USER_ADDED', 'USER_DELETED', 'USER_UPDATED', 'CUSTOMER_ADDED', 'CUSTOMER_DELETED', 'CUSTOMER_UPDATED', 'MESSAGE_SENDED');

-- CreateTable
CREATE TABLE "public"."workspace" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."attachment" (
    "id" SERIAL NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "commentId" INTEGER,
    "messageId" INTEGER,
    "projectId" INTEGER,
    "taskId" INTEGER,

    CONSTRAINT "attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "senderId" TEXT NOT NULL,
    "projectId" INTEGER,
    "taskId" INTEGER,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."read" (
    "id" SERIAL NOT NULL,
    "commentId" INTEGER,
    "messageId" INTEGER,
    "userId" TEXT NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "read_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."company" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "workspaceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."customer" (
    "id" SERIAL NOT NULL,
    "fullName" VARCHAR(100) NOT NULL,
    "bio" TEXT,
    "imageUrl" TEXT,
    "email" VARCHAR(100) NOT NULL,
    "phoneNumber" VARCHAR(20),
    "publicLink" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."project" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(5000),
    "deadline" TIMESTAMP(3) NOT NULL,
    "creatorId" TEXT,
    "customerId" INTEGER,
    "categoryId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."project_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "workspaceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."project_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."task" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(5000),
    "deadline" TIMESTAMP(3) NOT NULL,
    "projectId" INTEGER NOT NULL,
    "creatorId" TEXT,
    "categoryId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."task_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "workspaceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."task_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."subtask" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL,
    "taskId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subtask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."message_thread" (
    "id" SERIAL NOT NULL,
    "workspaceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "message_thread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."message" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "messageThreadId" INTEGER NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notification" (
    "id" SERIAL NOT NULL,
    "type" "public"."NotificationType" NOT NULL,
    "actorId" TEXT,
    "targetId" INTEGER,
    "targetName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notification_target" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "customerId" INTEGER,
    "projectId" INTEGER,
    "taskId" INTEGER,
    "messageId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_target_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notification_recipient" (
    "notificationId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "workspaceId" INTEGER NOT NULL,

    CONSTRAINT "notification_recipient_pkey" PRIMARY KEY ("notificationId","userId")
);

-- CreateTable
CREATE TABLE "public"."position" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "workspaceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "fullName" VARCHAR(100) NOT NULL,
    "bio" VARCHAR(5000),
    "address" VARCHAR(255),
    "birthdate" TIMESTAMP(3),
    "role" VARCHAR(50),
    "email" VARCHAR(100) NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,
    "phoneNumber" VARCHAR(20),
    "publicLink" TEXT,
    "positionId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."account" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "comment_projectId_idx" ON "public"."comment"("projectId");

-- CreateIndex
CREATE INDEX "comment_taskId_idx" ON "public"."comment"("taskId");

-- CreateIndex
CREATE INDEX "company_workspaceId_idx" ON "public"."company"("workspaceId");

-- CreateIndex
CREATE INDEX "customer_companyId_idx" ON "public"."customer"("companyId");

-- CreateIndex
CREATE INDEX "project_creatorId_idx" ON "public"."project"("creatorId");

-- CreateIndex
CREATE INDEX "project_customerId_idx" ON "public"."project"("customerId");

-- CreateIndex
CREATE INDEX "project_categoryId_idx" ON "public"."project"("categoryId");

-- CreateIndex
CREATE INDEX "project_statusId_idx" ON "public"."project"("statusId");

-- CreateIndex
CREATE INDEX "project_category_workspaceId_idx" ON "public"."project_category"("workspaceId");

-- CreateIndex
CREATE INDEX "task_projectId_idx" ON "public"."task"("projectId");

-- CreateIndex
CREATE INDEX "task_creatorId_idx" ON "public"."task"("creatorId");

-- CreateIndex
CREATE INDEX "task_categoryId_idx" ON "public"."task"("categoryId");

-- CreateIndex
CREATE INDEX "task_statusId_idx" ON "public"."task"("statusId");

-- CreateIndex
CREATE INDEX "task_category_workspaceId_idx" ON "public"."task_category"("workspaceId");

-- CreateIndex
CREATE INDEX "message_thread_workspaceId_idx" ON "public"."message_thread"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "notification_targetId_key" ON "public"."notification"("targetId");

-- CreateIndex
CREATE UNIQUE INDEX "notification_target_userId_key" ON "public"."notification_target"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "notification_target_customerId_key" ON "public"."notification_target"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "notification_target_projectId_key" ON "public"."notification_target"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "notification_target_taskId_key" ON "public"."notification_target"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "notification_target_messageId_key" ON "public"."notification_target"("messageId");

-- CreateIndex
CREATE INDEX "notification_recipient_workspaceId_idx" ON "public"."notification_recipient"("workspaceId");

-- CreateIndex
CREATE INDEX "position_workspaceId_idx" ON "public"."position"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "public"."session"("token");

-- AddForeignKey
ALTER TABLE "public"."attachment" ADD CONSTRAINT "attachment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "public"."comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attachment" ADD CONSTRAINT "attachment_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attachment" ADD CONSTRAINT "attachment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."attachment" ADD CONSTRAINT "attachment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comment" ADD CONSTRAINT "comment_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comment" ADD CONSTRAINT "comment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comment" ADD CONSTRAINT "comment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."read" ADD CONSTRAINT "read_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "public"."comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."read" ADD CONSTRAINT "read_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."read" ADD CONSTRAINT "read_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."company" ADD CONSTRAINT "company_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."customer" ADD CONSTRAINT "customer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project" ADD CONSTRAINT "project_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project" ADD CONSTRAINT "project_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project" ADD CONSTRAINT "project_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."project_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project" ADD CONSTRAINT "project_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "public"."project_status"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_category" ADD CONSTRAINT "project_category_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task" ADD CONSTRAINT "task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task" ADD CONSTRAINT "task_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task" ADD CONSTRAINT "task_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."task_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task" ADD CONSTRAINT "task_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "public"."task_status"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task_category" ADD CONSTRAINT "task_category_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."subtask" ADD CONSTRAINT "subtask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."message_thread" ADD CONSTRAINT "message_thread_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."message" ADD CONSTRAINT "message_messageThreadId_fkey" FOREIGN KEY ("messageThreadId") REFERENCES "public"."message_thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."message" ADD CONSTRAINT "message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."message" ADD CONSTRAINT "message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification" ADD CONSTRAINT "notification_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification" ADD CONSTRAINT "notification_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "public"."notification_target"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification_target" ADD CONSTRAINT "notification_target_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification_target" ADD CONSTRAINT "notification_target_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification_target" ADD CONSTRAINT "notification_target_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification_target" ADD CONSTRAINT "notification_target_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification_target" ADD CONSTRAINT "notification_target_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification_recipient" ADD CONSTRAINT "notification_recipient_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "public"."notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification_recipient" ADD CONSTRAINT "notification_recipient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification_recipient" ADD CONSTRAINT "notification_recipient_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."position" ADD CONSTRAINT "position_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "public"."position"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
