import { NotificationList } from "../NotificationList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationModalContent } from "./NotificationModalContent";
import { Default as NotificationListStory } from "../NotificationList/NotificationList.stories";
import { NotificationFilterToggleButtonGroup } from "../NotificationFilterToggleButtonGroup";

const meta = {
  title: "Components/notifications/NotificationModalContent",
  component: NotificationModalContent,
} satisfies Meta<typeof NotificationModalContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: [
      <NotificationFilterToggleButtonGroup
        notificationsCount={10}
        unreadCount={5}
      />,
      <NotificationList {...NotificationListStory.args} />,
    ],
  },
} satisfies Story;
