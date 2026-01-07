import { NotificationType } from "@/generated/prisma/client";

export const notificationTargets = [
  //Projects
  {
    id: 10,
    notificationId: 12,
    projectId: 41,
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 11,
    notificationId: 13,
    projectId: 42,
    createdAt: "2025-01-02T00:00:00.000Z",
  },
  {
    id: 12,
    notificationId: 14,
    projectId: 43,
    createdAt: "2025-01-03T00:00:00.000Z",
  },

  //Tasks
  {
    id: 13,
    notificationId: 16,
    taskId: 558,
    createdAt: "2025-01-05T00:00:00.000Z",
  },
  {
    id: 14,
    notificationId: 17,
    taskId: 559,
    createdAt: "2025-01-06T00:00:00.000Z",
  },
  {
    id: 15,
    notificationId: 18,
    taskId: 560,
    createdAt: "2025-01-07T00:00:00.000Z",
  },

  //Comments
  {
    id: 16,
    notificationId: 20,
    commentId: 5173,
    createdAt: "2025-01-05T00:00:00.000Z",
  },
  {
    id: 17,
    notificationId: 21,
    commentId: 5172,
    createdAt: "2025-01-06T00:00:00.000Z",
  },
  {
    id: 18,
    notificationId: 22,
    taskId: 558,
    createdAt: "2025-01-06T00:00:00.000Z",
  },
];

export const notifications = [
  //Projects
  {
    id: 12,
    workspaceId: 1,
    actorId: "user-11",
    recipientId: "user-20",
    type: NotificationType.projectAdded,
    createdAt: "2025-01-01T00:00:00.000Z",
    isRead: true,
  },
  {
    id: 13,
    workspaceId: 1,
    actorId: "user-15",
    recipientId: "user-20",
    type: NotificationType.projectDeadlineChanged,
    createdAt: "2025-01-07T00:00:00.000Z",
    isRead: true,
  },
  {
    id: 14,
    workspaceId: 1,
    actorId: "user-11",
    recipientId: "user-20",
    type: NotificationType.projectStatusChanged,
    createdAt: "2025-01-07T00:00:00.000Z",
    isRead: true,
  },
  {
    id: 15,
    workspaceId: 1,
    actorId: "user-15",
    recipientId: "user-20",
    type: NotificationType.projectDeleted,
    createdAt: "2025-03-08T00:00:00.000Z",
    isRead: true,
    content: "Updating API v1.5 documentation",
  },

  //Tasks
  {
    id: 16,
    workspaceId: 1,
    actorId: "user-11",
    recipientId: "user-20",
    type: NotificationType.taskAdded,
    createdAt: "2025-01-02T00:00:00.000Z",
    isRead: true,
  },
  {
    id: 17,
    workspaceId: 1,
    actorId: "user-15",
    recipientId: "user-20",
    type: NotificationType.taskDeadlineChanged,
    createdAt: "2025-01-06T00:00:00.000Z",
    isRead: true,
  },
  {
    id: 18,
    workspaceId: 1,
    actorId: "user-11",
    recipientId: "user-20",
    type: NotificationType.taskStatusChanged,
    createdAt: "2025-01-06T00:00:00.000Z",
    isRead: true,
  },
  {
    id: 19,
    workspaceId: 1,
    actorId: "user-15",
    recipientId: "user-20",
    type: NotificationType.taskDeleted,
    createdAt: "2025-03-18T00:00:00.000Z",
    isRead: true,
    content: "Setting up CI/CD pipeline",
  },

  //Comments
  {
    id: 20,
    workspaceId: 1,
    actorId: "user-11",
    recipientId: "user-20",
    type: NotificationType.commentAdded,
    createdAt: "2025-01-02T00:00:00.000Z",
    isRead: true,
  },
  {
    id: 21,
    workspaceId: 1,
    actorId: "user-15",
    recipientId: "user-20",
    type: NotificationType.commentChanged,
    createdAt: "2025-01-06T00:00:00.000Z",
    isRead: true,
  },
  {
    id: 22,
    workspaceId: 1,
    actorId: "user-15",
    recipientId: "user-20",
    type: NotificationType.commentDeleted,
    createdAt: "2025-03-18T00:00:00.000Z",
    isRead: true,
    content: "I need a list of the homepage sections to start working on the layout in Figma. Do you already have one, or do you need some references?",
  },
];
