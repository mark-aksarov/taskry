import { AppHeader } from "./AppHeader";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { AppBottomSheetTrigger } from "../AppBottomSheetTrigger";
import { AppSidebarSheetTrigger } from "../AppSidebarSheetTrigger";
import { NotificationModalTrigger } from "@/components/notifications/NotificationModalTrigger";
import { Default as NotificationModalTriggerStory } from "@/components/notifications/NotificationModalTrigger/NotificationModalTrigger.stories";

const meta = {
  title: "Components/layout/AppHeader",
  component: AppHeader,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof AppHeader>;

export const Default = {
  args: {
    title: "Dashboard",
    notificationModalTrigger: (
      <NotificationModalTrigger {...NotificationModalTriggerStory.args} />
    ),
    appBottomSheetTrigger: <AppBottomSheetTrigger />,
    appSidebarSheetTrigger: <AppSidebarSheetTrigger />,
  },
} satisfies Story;
