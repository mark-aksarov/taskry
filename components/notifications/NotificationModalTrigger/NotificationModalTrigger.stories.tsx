import { Notifications } from "../Notifications";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationModalTrigger } from "./NotificationModalTrigger";
import { Default as NotificationListStory } from "../NotificationList/NotificationList.stories";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta = {
  title: "Components/notifications/NotificationModalTrigger",
  component: NotificationModalTrigger,
  tags: ["autodocs"],
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof NotificationModalTrigger>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    notifications: (
      <Notifications
        notifications={NotificationListStory.args?.notifications}
      />
    ),
  },
} satisfies Story;
