import { NotificationType } from "@/generated/prisma/client";

export const notificationTargets = [
  //Projects
  {
    id: 1,
    notificationId: 1,
    projectId: 1,
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    notificationId: 2,
    projectId: 2,
    createdAt: "2025-01-02T00:00:00.000Z",
  },
  {
    id: 3,
    notificationId: 3,
    projectId: 3,
    createdAt: "2025-01-03T00:00:00.000Z",
  },

  //Tasks
  {
    id: 4,
    notificationId: 5,
    taskId: 1,
    createdAt: "2025-01-05T00:00:00.000Z",
  },
  {
    id: 5,
    notificationId: 6,
    taskId: 2,
    createdAt: "2025-01-06T00:00:00.000Z",
  },
  {
    id: 6,
    notificationId: 7,
    taskId: 3,
    createdAt: "2025-01-07T00:00:00.000Z",
  },

  //Comments
  {
    id: 7,
    notificationId: 9,
    commentId: 461,
    createdAt: "2025-01-05T00:00:00.000Z",
  },
  {
    id: 8,
    notificationId: 10,
    commentId: 460,
    createdAt: "2025-01-06T00:00:00.000Z",
  },
  {
    id: 9,
    notificationId: 11,
    taskId: 3,
    createdAt: "2025-01-06T00:00:00.000Z",
  },
];

export const notifications = [
  //Projects
  {
    id: 1,
    workspaceId: 1,
    actorId: "user-1",
    recipientId: "user-10",
    type: NotificationType.projectAdded,
    createdAt: "2025-01-01T00:00:00.000Z",
    isRead: true,
  },
  {
    id: 2,
    workspaceId: 1,
    actorId: "user-5",
    recipientId: "user-10",
    type: NotificationType.projectDeadlineChanged,
    createdAt: "2025-01-07T00:00:00.000Z",
    isRead: true,
  },
  {
    id: 3,
    workspaceId: 1,
    actorId: "user-1",
    recipientId: "user-10",
    type: NotificationType.projectStatusChanged,
    createdAt: "2025-01-07T00:00:00.000Z",
    isRead: true,
  },
  {
    id: 4,
    workspaceId: 1,
    actorId: "user-5",
    recipientId: "user-10",
    type: NotificationType.projectDeleted,
    createdAt: "2025-03-08T00:00:00.000Z",
    isRead: true,
    content: "Разработка сайта для внутреннего использования.",
  },

  //Tasks
  {
    id: 5,
    workspaceId: 1,
    actorId: "user-1",
    recipientId: "user-10",
    type: NotificationType.taskAdded,
    createdAt: "2025-01-02T00:00:00.000Z",
    isRead: true,
  },
  {
    id: 6,
    workspaceId: 1,
    actorId: "user-5",
    recipientId: "user-10",
    type: NotificationType.taskDeadlineChanged,
    createdAt: "2025-01-06T00:00:00.000Z",
    isRead: true,
  },
  {
    id: 7,
    workspaceId: 1,
    actorId: "user-1",
    recipientId: "user-10",
    type: NotificationType.taskStatusChanged,
    createdAt: "2025-01-06T00:00:00.000Z",
    isRead: true,
  },
  {
    id: 8,
    workspaceId: 1,
    actorId: "user-5",
    recipientId: "user-10",
    type: NotificationType.taskDeleted,
    createdAt: "2025-03-18T00:00:00.000Z",
    isRead: true,
    content: "Проектирование схемы БД.",
  },

  //Comments
  {
    id: 9,
    workspaceId: 1,
    actorId: "user-1",
    recipientId: "user-10",
    type: NotificationType.commentAdded,
    createdAt: "2025-01-02T00:00:00.000Z",
    isRead: true,
  },
  {
    id: 10,
    workspaceId: 1,
    actorId: "user-5",
    recipientId: "user-10",
    type: NotificationType.commentChanged,
    createdAt: "2025-01-06T00:00:00.000Z",
    isRead: true,
  },
  {
    id: 11,
    workspaceId: 1,
    actorId: "user-5",
    recipientId: "user-10",
    type: NotificationType.commentDeleted,
    createdAt: "2025-03-18T00:00:00.000Z",
    isRead: true,
    content: "Нужен список секций главной страницы, чтобы начать работу над структурой в Figma. Он уже есть или нужны референсы?",
  },
];
