import { mocked } from "storybook/test";
import { AppHeader } from "../AppHeader";
import { usePathname } from "next/navigation";
import { ProfileLink } from "../ProfileLink";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withSearchBarProvider } from "@/components/search/SearchBar/__stories__";
import { withTaskSearchModal } from "@/components/tasks/TaskSearchModal/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/layout/AppHeader",
  component: AppHeader,
  decorators: [
    withTaskSearchModal,
    withSearchBarProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/");
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    heading: "Dashboard",
    profileLinkContainer: <ProfileLink fullName="User 1" imageUrl="/man.jpg" />,
  },
} satisfies Story;
