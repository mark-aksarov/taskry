import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationFilterToggleButtonGroup } from "./NotificationFilterToggleButtonGroup";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/notifications/NotificationFilterToggleButtonGroup",
  component: NotificationFilterToggleButtonGroup,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof NotificationFilterToggleButtonGroup>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    notificationsCount: 10,
    unreadCount: 5,
  },
} satisfies Story;
