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

const mockedNotifications = [
  // PROJECT EVENTS
  {
    id: 1,
    type: "projectAdded",
    content: "New project 'Mobile App Launch' has been created.",
    createdAt: new Date("2026-01-07T09:00:00Z"),
    updatedAt: new Date("2026-01-07T09:00:00Z"),
    isRead: false,
    actor: {
      id: "user-1",
      fullName: "Alice Freeman",
      imageUrl: "/woman.jpg",
    },
    target: {
      id: 101,
      project: {
        id: 50,
        title: "Mobile App Launch",
        deadline: new Date("2026-06-01"),
        status: ProjectStatus.pending,
      },
    },
  },
  {
    id: 2,
    type: "projectDeadlineChanged",
    content: "The deadline for 'Website Redesign' was moved to next Friday.",
    createdAt: new Date("2026-01-07T10:30:00Z"),
    updatedAt: new Date("2026-01-07T10:30:00Z"),
    isRead: false,
    actor: { id: "user-2", fullName: "Bob Miller" },
    target: {
      id: 102,
      project: {
        id: 51,
        title: "Website Redesign",
        deadline: new Date("2026-01-16"),
        status: ProjectStatus.active,
      },
    },
  },
  {
    id: 3,
    type: "projectStatusChanged",
    content: "Project 'Q1 Audit' is now 'COMPLETED'.",
    createdAt: new Date("2026-01-06T17:00:00Z"),
    updatedAt: new Date("2026-01-06T17:00:00Z"),
    isRead: true,
    target: {
      id: 103,
      project: {
        id: 52,
        title: "Q1 Audit",
        deadline: new Date("2025-12-31"),
        status: ProjectStatus.completed,
      },
    },
  },
  {
    id: 4,
    type: "projectDeleted",
    content: "Project 'Temporary Sandbox' was deleted.",
    createdAt: new Date("2026-01-05T14:20:00Z"),
    updatedAt: new Date("2026-01-05T14:20:00Z"),
    isRead: true,
    actor: { id: "user-3", fullName: "Admin System" },
  },

  // TASK EVENTS
  {
    id: 5,
    type: "taskAdded",
    content: "Assigned you a new task: 'Write Unit Tests'.",
    createdAt: new Date("2026-01-07T11:15:00Z"),
    updatedAt: new Date("2026-01-07T11:15:00Z"),
    isRead: false,
    actor: { id: "user-1", fullName: "Alice Freeman" },
    target: {
      id: 201,
      task: {
        id: 801,
        title: "Write Unit Tests",
        deadline: new Date("2026-01-10"),
        status: TaskStatus.pending,
      },
    },
  },
  {
    id: 6,
    type: "taskDeadlineChanged",
    content: "The deadline for 'API Integration' was updated.",
    createdAt: new Date("2026-01-07T13:00:00Z"),
    updatedAt: new Date("2026-01-07T13:00:00Z"),
    isRead: false,
    target: {
      id: 202,
      task: {
        id: 802,
        title: "API Integration",
        deadline: new Date("2026-01-20"),
        status: TaskStatus.completed,
      },
    },
  },
  {
    id: 7,
    type: "taskStatusChanged",
    content: "Task 'Fix Header Bug' is now 'BLOCKED'.",
    createdAt: new Date("2026-01-07T08:45:00Z"),
    updatedAt: new Date("2026-01-07T08:45:00Z"),
    isRead: false,
    actor: { id: "user-4", fullName: "Charlie Day" },
    target: {
      id: 203,
      task: {
        id: 803,
        title: "Fix Header Bug",
        deadline: new Date("2026-01-08"),
        status: TaskStatus.active,
      },
    },
  },

  // COMMENT EVENTS
  {
    id: 8,
    type: "commentAdded",
    content: "added a comment on 'Database Schema'.",
    createdAt: new Date("2026-01-07T12:00:00Z"),
    updatedAt: new Date("2026-01-07T12:00:00Z"),
    isRead: false,
    actor: {
      id: "user-2",
      fullName: "Bob Miller",
      imageUrl: "/man.jpg",
    },
    target: {
      id: 301,
      comment: {
        id: 901,
        content: "We should consider indexing the email column.",
        createdAt: new Date("2026-01-07T12:00:00Z"),
        attachments: [],
        task: { id: 805, title: "Database Schema" },
      },
    },
  },
  {
    id: 9,
    type: "commentChanged",
    content: "edited their comment on 'Landing Page'.",
    createdAt: new Date("2026-01-07T12:30:00Z"),
    updatedAt: new Date("2026-01-07T12:35:00Z"),
    isRead: true,
    actor: { id: "user-1", fullName: "Alice Freeman" },
    target: {
      id: 302,
      comment: {
        id: 902,
        content: "(Edited) The hex code should be #FF5733.",
        createdAt: new Date("2026-01-07T12:30:00Z"),
        attachments: [{ id: 10, fileName: "styleguide.pdf", fileUrl: "..." }],
        project: { id: 51, title: "Website Redesign" },
      },
    },
  },
  {
    id: 10,
    type: "commentDeleted",
    content: "A comment was removed from the 'Security Audit' task.",
    createdAt: new Date("2026-01-07T09:00:00Z"),
    updatedAt: new Date("2026-01-07T09:00:00Z"),
    isRead: true,
    target: {
      id: 303,
      task: {
        id: 809,
        title: "Security Audit",
        deadline: new Date("2026-02-01"),
        status: TaskStatus.completed,
      },
    },
  },
];

export const Default = {
  args: {
    children: (
      <>
        {mockedNotifications.map((notification) => (
          <NotificationListItem
            key={notification.id}
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
