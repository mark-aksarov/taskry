import { Meta, StoryObj } from "@storybook/react";
import { NotificationListItem } from "./NotificationListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { NotificationListItemTarget } from "./NotificationListItemTarget";
import { NotificationListItemContent } from "./NotificationListItemContent";
import { NotificationListItemActorLink } from "./NotificationListItemActorLink";
import { NotificationListItemActionText } from "./NotificationListItemActionText";
import { NotificationListItemActorImageLink } from "./NotificationListItemActorImageLink";
import { ProjectStatus } from "@/generated/prisma/enums";
import { NotificationListItemDTO } from "@/lib/data/notification/notification.dto";

const meta = {
  title: "Components/notifications/NotificationListItem",
  component: NotificationListItem,
  tags: ["autodocs"],
  parameters: {
    backgroundVariant: "alt",
    layout: "fullscreen",
  },
  decorators: [withThemedBackground],
} satisfies Meta<typeof NotificationListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockedNotification: NotificationListItemDTO = {
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
    status: ProjectStatus.active,
  },

  projectTitle: "Mobile App Launch",
};

export const Default = {
  args: {
    date: mockedNotification.createdAt,
    isRead: mockedNotification.isRead,
    target: <NotificationListItemTarget notification={mockedNotification} />,
    content: <NotificationListItemContent notification={mockedNotification} />,
    actorImageLink: (
      <NotificationListItemActorImageLink actor={mockedNotification.actor} />
    ),
    actorLink: (
      <NotificationListItemActorLink actor={mockedNotification.actor} />
    ),
    actionContent: (
      <NotificationListItemActionText
        notificationType={mockedNotification.type}
      />
    ),
  },
} satisfies Story;

export const Unread = {
  args: {
    ...Default.args,
    isRead: false,
  },
} satisfies Story;

export const WithoutActor = {
  args: {
    ...Default.args,
    actorImageLink: undefined,
    actorLink: undefined,
  },
} satisfies Story;
