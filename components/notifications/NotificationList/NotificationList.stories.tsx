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
    createdAt: new Date("2026-01-19T09:00:00Z"),
    isRead: false,
    actor: {
      id: "user-1",
      fullName: "Alice Freeman",
      imageUrl: "/woman.jpg",
    },
    project: { id: 50, title: "AI Integration Phase" },
    projectTitle: "AI Integration Phase",
  },
  {
    id: 2,
    type: "projectChanged",
    createdAt: new Date("2026-01-18T15:30:00Z"),
    isRead: true,
    actor: { id: "user-2", fullName: "Bob Miller" },
    project: { id: 51, title: "Global Marketing Campaign" },
    projectTitle: "Global Marketing Campaign",
  },
  {
    id: 3,
    type: "projectDeleted",
    createdAt: new Date("2026-01-15T11:00:00Z"),
    isRead: true,
    actor: { id: "user-5", fullName: "Sarah Connor" },
    projectTitle: "Legacy Support",
  },

  // TASK EVENTS
  {
    id: 4,
    type: "taskAdded",
    createdAt: new Date("2026-01-19T11:15:00Z"),
    isRead: false,
    actor: { id: "user-1", fullName: "Alice Freeman" },
    task: { id: 801, title: "Optimize Database Queries" },
    taskTitle: "Optimize Database Queries",
  },
  {
    id: 5,
    type: "taskChanged",
    createdAt: new Date("2026-01-19T13:45:00Z"),
    isRead: false,
    actor: { id: "user-6", fullName: "David Bowie" },
    task: { id: 802, title: "Refactor Auth Flow" },
    taskTitle: "Refactor Auth Flow",
  },
  {
    id: 6,
    type: "taskDeleted",
    createdAt: new Date("2026-01-18T08:45:00Z"),
    isRead: true,
    actor: { id: "user-4", fullName: "Charlie Day" },
    taskTitle: "Fix IE11 CSS Bug",
  },

  // USER EVENTS
  {
    id: 7,
    type: "userAdded",
    createdAt: new Date("2026-01-17T14:20:00Z"),
    isRead: true,
    actor: { id: "user-7", fullName: "Admin Chief" },
    user: { id: "user-8", fullName: "Frank Castle" },
    userFullName: "Frank Castle",
  },
  {
    id: 8,
    type: "userChanged",
    createdAt: new Date("2026-01-17T16:00:00Z"),
    isRead: true,
    actor: { id: "user-1", fullName: "Alice Freeman" },
    user: { id: "user-3", fullName: "Charlie Day" },
    userFullName: "Charlie Day",
  },
  {
    id: 9,
    type: "userDeleted",
    createdAt: new Date("2026-01-16T10:00:00Z"),
    isRead: true,
    actor: { id: "user-2", fullName: "Bob Miller" },
    userFullName: "John Doe",
  },

  // CUSTOMER EVENTS
  {
    id: 10,
    type: "customerAdded",
    createdAt: new Date("2026-01-19T08:30:00Z"),
    isRead: false,
    actor: { id: "user-9", fullName: "Grace Hopper" },
    customer: { id: 101, fullName: "Tesla Motors" },
    customerFullName: "Tesla Motors",
  },
  {
    id: 11,
    type: "customerChanged",
    createdAt: new Date("2026-01-18T12:00:00Z"),
    isRead: true,
    actor: { id: "user-1", fullName: "Alice Freeman" },
    customer: { id: 102, fullName: "SpaceX" },
    customerFullName: "SpaceX",
  },
  {
    id: 12,
    type: "customerDeleted",
    createdAt: new Date("2026-01-14T09:00:00Z"),
    isRead: true,
    actor: { id: "user-4", fullName: "Charlie Day" },
    customerFullName: "Acme Corp",
  },

  // COMMENT EVENTS
  {
    id: 13,
    type: "commentAdded",
    createdAt: new Date("2026-01-19T15:10:00Z"),
    isRead: false,
    actor: {
      id: "user-2",
      fullName: "Bob Miller",
      imageUrl: "/man.jpg",
    },
    task: { id: 804, title: "Infrastructure Setup" },
    comment: { id: 901, content: "Don't forget to setup the S3 buckets." },
    taskTitle: "Infrastructure Setup",
    commentContent: "Don't forget to setup the S3 buckets.",
  },
  {
    id: 14,
    type: "commentChanged",
    createdAt: new Date("2026-01-19T16:05:00Z"),
    isRead: false,
    actor: { id: "user-1", fullName: "Alice Freeman" },
    project: { id: 51, title: "Website Redesign" },
    comment: {
      id: 902,
      content: "Actually, let's use the dark theme by default.",
    },
    projectTitle: "Website Redesign",
    commentContent: "Actually, let's use the dark theme by default.",
  },
  {
    id: 15,
    type: "commentDeleted",
    createdAt: new Date("2026-01-19T10:00:00Z"),
    isRead: true,
    actor: { id: "user-6", fullName: "David Bowie" },
    taskTitle: "Security Audit",
    commentContent: "This comment contained sensitive API keys.",
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
