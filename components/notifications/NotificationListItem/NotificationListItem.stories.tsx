import { Meta, StoryObj } from "@storybook/react";
import { NotificationListItem } from "./NotificationListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Link } from "@/components/ui";

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

export const Default = {
  args: {
    date: new Date("2025-09-23T08:00:00Z"),
    isRead: true,
    actor: {
      id: "user-2",
      fullName: "Alice Johnson",
      imageUrl: "/woman.jpg",
    },
    actionText: "added a new task",
    target: <Link href="#">Create Landing Page</Link>,
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
    actor: undefined,
  },
} satisfies Story;

export const WithComment = {
  args: {
    ...Default.args,
    comment: {
      content:
        "I totally agree with Alice. The performance improvements are noticeable, especially in larger datasets. One suggestion though: it might be helpful to include a loading indicator when switching between tabs, since the delay can confuse first-time users.",
      attachments: [],
    },
  },
} satisfies Story;

export const WithAttachements = {
  args: {
    ...WithComment.args,
    comment: {
      ...WithComment.args.comment,
      attachments: [
        {
          id: 1,
          fileUrl: "/placeholder.jpg",
          fileName: "placeholder.jpg",
        },
        {
          id: 2,
          fileUrl: "/placeholder.jpg",
          fileName: "placeholder.jpg",
        },
      ],
    },
  },
} satisfies Story;
