import { mocked } from "storybook/test";
import { AppHeader } from "./AppHeader";
import { usePathname } from "next/navigation";
import { AppNavigation } from "../AppNavigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchModal } from "@/components/search/SearchModal";
import { AppBottomSheetTrigger } from "../AppBottomSheetTrigger";
import { AppSidebarSheetTrigger } from "../AppSidebarSheetTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { NotificationModalContent } from "@/components/notifications/NotificationModalContent";
import { Default as SearchModalStory } from "@/components/search/SearchModal/SearchModal.stories";
import { Default as NotificationModalContentStory } from "@/components/notifications/NotificationModalContent/NotificationModalContent.stories";

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
    appBottomSheetTrigger: (
      <AppBottomSheetTrigger appNavigation={<AppNavigation />} />
    ),
    appSidebarSheetTrigger: (
      <AppSidebarSheetTrigger appNavigation={<AppNavigation />} />
    ),
    notificationModalContentContainer: (
      <NotificationModalContent {...NotificationModalContentStory.args} />
    ),
    searchModal: <SearchModal {...SearchModalStory.args} />,
  },
} satisfies Story;
