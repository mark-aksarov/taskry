import { fn } from "storybook/internal/test";
import { NotificationList } from "../NotificationList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationModalContent } from "./NotificationModalContent";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as NotificationListStory } from "../NotificationList/NotificationList.stories";

const meta = {
  title: "Components/notifications/NotificationModalContent",
  component: NotificationModalContent,
  decorators: [withThemedBackground],
} satisfies Meta<typeof NotificationModalContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    notificationList: <NotificationList {...NotificationListStory.args} />,
    totalCount: 20,
    unreadCount: 10,
    page: 1,
    pageSize: 10,
    totalPages: 2,
    setPage: fn(),
    filter: "all",
    setFilter: fn(),
    markAsReadAction: fn(),
    mutate: fn(),
  },
} satisfies Story;
