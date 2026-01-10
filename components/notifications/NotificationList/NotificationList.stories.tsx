import {
  NotificationListItem,
  NotificationListItemTarget,
  NotificationListItemContent,
  NotificationListItemActorLink,
  NotificationListItemActionText,
  NotificationListItemActorImageLink,
} from "../NotificationListItem";

import { Meta, StoryObj } from "@storybook/react";
import { NotificationList } from "./NotificationList";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { NotificationListItemDTO } from "@/lib/data/notification/notification.dto";

const meta = {
  title: "Components/notifications/NotificationList",
  component: NotificationList,
  parameters: {
    backgroundVariant: "alt",
    layout: "fullscreen",
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockedNotifications: NotificationListItemDTO[] = [
  // PROJECT EVENTS
  {
    id: 1,
    type: "projectAdded",
    createdAt: new Date("2026-01-07T09:00:00Z"),
    updatedAt: new Date("2026-01-07T09:00:00Z"),
    isRead: false,
    actor: {
      id: "user-1",
      fullName: "Alice Freeman",
      imageUrl: "/woman.jpg",
    },

    project: {
      id: 50,
      title: "Mobile App Launch",
      deadline: new Date("2026-06-01"),
      status: ProjectStatus.pending,
    },

    projectTitle: "Mobile App Launch",
    projectDeadline: new Date("2026-06-01"),
    projectStatus: ProjectStatus.pending,
  },
  {
    id: 2,
    type: "projectDeadlineChanged",
    createdAt: new Date("2026-01-07T10:30:00Z"),
    updatedAt: new Date("2026-01-07T10:30:00Z"),
    isRead: false,
    actor: { id: "user-2", fullName: "Bob Miller" },

    project: {
      id: 51,
      title: "Website Redesign",
      deadline: new Date("2026-01-16"),
      status: ProjectStatus.active,
    },

    projectTitle: "Mobile App Launch",
    projectDeadline: new Date("2026-01-16"),
    projectStatus: ProjectStatus.active,
  },
  {
    id: 3,
    type: "projectStatusChanged",
    createdAt: new Date("2026-01-06T17:00:00Z"),
    updatedAt: new Date("2026-01-06T17:00:00Z"),
    isRead: true,

    project: {
      id: 52,
      title: "Q1 Audit",
      deadline: new Date("2025-12-31"),
      status: ProjectStatus.completed,
    },

    projectTitle: "Q1 Audit",
    projectDeadline: new Date("2025-12-31"),
    projectStatus: ProjectStatus.completed,
  },
  {
    id: 4,
    type: "projectDeleted",
    createdAt: new Date("2026-01-05T14:20:00Z"),
    updatedAt: new Date("2026-01-05T14:20:00Z"),
    isRead: true,

    projectTitle: "Q1 Audit",
    projectDeadline: new Date("2025-12-31"),
    projectStatus: ProjectStatus.completed,
  },

  // TASK EVENTS
  {
    id: 5,
    type: "taskAdded",
    createdAt: new Date("2026-01-07T11:15:00Z"),
    updatedAt: new Date("2026-01-07T11:15:00Z"),
    isRead: false,
    actor: { id: "user-1", fullName: "Alice Freeman" },

    task: {
      id: 801,
      title: "Write Unit Tests",
      deadline: new Date("2026-01-10"),
      status: TaskStatus.pending,
    },

    taskTitle: "Write Unit Tests",
    taskDeadline: new Date("2026-01-10"),
    taskStatus: TaskStatus.pending,
  },
  {
    id: 6,
    type: "taskDeadlineChanged",
    createdAt: new Date("2026-01-07T13:00:00Z"),
    updatedAt: new Date("2026-01-07T13:00:00Z"),
    isRead: false,

    task: {
      id: 802,
      title: "API Integration",
      deadline: new Date("2026-01-20"),
      status: TaskStatus.completed,
    },

    taskTitle: "API Integration",
    taskDeadline: new Date("2026-01-10"),
    taskStatus: TaskStatus.completed,
  },
  {
    id: 7,
    type: "taskStatusChanged",
    createdAt: new Date("2026-01-07T08:45:00Z"),
    updatedAt: new Date("2026-01-07T08:45:00Z"),
    isRead: false,
    actor: { id: "user-4", fullName: "Charlie Day" },

    task: {
      id: 803,
      title: "Fix Header Bug",
      deadline: new Date("2026-01-08"),
      status: TaskStatus.active,
    },

    taskTitle: "Fix Header Bug",
    taskDeadline: new Date("2026-01-08"),
    taskStatus: TaskStatus.active,
  },

  // COMMENT EVENTS
  {
    id: 8,
    type: "commentAdded",
    createdAt: new Date("2026-01-07T12:00:00Z"),
    updatedAt: new Date("2026-01-07T12:00:00Z"),
    isRead: false,
    actor: {
      id: "user-2",
      fullName: "Bob Miller",
      imageUrl: "/man.jpg",
    },

    task: {
      id: 804,
      title: "Database Schema",
      deadline: new Date("2026-01-08"),
      status: TaskStatus.active,
    },

    comment: {
      id: 901,
      content: "We should consider indexing the email column.",
    },

    taskTitle: "Database Schema",
    commentContent: "We should consider indexing the email column.",
  },
  {
    id: 9,
    type: "commentChanged",
    createdAt: new Date("2026-01-07T12:30:00Z"),
    updatedAt: new Date("2026-01-07T12:35:00Z"),
    isRead: true,
    actor: { id: "user-1", fullName: "Alice Freeman" },

    project: {
      id: 51,
      title: "Website Redesign",
      deadline: new Date("2026-01-08"),
      status: TaskStatus.active,
    },

    comment: {
      id: 902,
      content: "(Edited) The hex code should be #FF5733.",
    },

    projectTitle: "Website Redesign",
    commentContent: "(Edited) The hex code should be #FF5733.",
  },
  {
    id: 10,
    type: "commentDeleted",
    createdAt: new Date("2026-01-07T09:00:00Z"),
    updatedAt: new Date("2026-01-07T09:00:00Z"),
    isRead: true,

    task: {
      id: 809,
      title: "Security Audit",
      deadline: new Date("2026-02-01"),
      status: TaskStatus.completed,
    },

    taskTitle: "Security Audit",
    commentContent: "The hex code should be #FF5733.",
  },
];

export const Default = {
  args: {
    children: (
      <>
        {mockedNotifications.map((notification) => (
          <NotificationListItem
            key={notification.id}
            id={notification.id}
            isRead={notification.isRead}
            date={notification.createdAt}
            target={<NotificationListItemTarget notification={notification} />}
            content={
              <NotificationListItemContent notification={notification} />
            }
            actorImageLink={
              <NotificationListItemActorImageLink actor={notification.actor} />
            }
            actorLink={
              <NotificationListItemActorLink actor={notification.actor} />
            }
            actionContent={
              <NotificationListItemActionText
                notificationType={notification.type}
              />
            }
          />
        ))}
      </>
    ),
  },
} satisfies Story;
