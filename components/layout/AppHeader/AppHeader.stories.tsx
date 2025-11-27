import { mocked } from "storybook/test";
import { AppHeader } from "./AppHeader";
import { usePathname } from "next/navigation";
import { AppNavigation } from "../AppNavigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppBottomSheetTrigger } from "../AppBottomSheetTrigger";
import { AppSidebarSheetTrigger } from "../AppSidebarSheetTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { NotificationModalTrigger } from "@/components/notifications/NotificationModalTrigger";
import { Default as NotificationModalTriggerStory } from "@/components/notifications/NotificationModalTrigger/NotificationModalTrigger.stories";

const meta = {
  title: "Components/layout/AppHeader",
  component: AppHeader,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/");
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    notificationModalTrigger: (
      <NotificationModalTrigger {...NotificationModalTriggerStory.args} />
    ),
    appBottomSheetTrigger: (
      <AppBottomSheetTrigger appNavigation={<AppNavigation />} />
    ),
    appSidebarSheetTrigger: (
      <AppSidebarSheetTrigger appNavigation={<AppNavigation />} />
    ),
  },
} satisfies Story;
