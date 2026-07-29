import { mocked } from "storybook/test";
import { AppHeader } from "../AppHeader";
import { ProfileLink } from "../ProfileLink";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/layout/AppHeader",
  component: AppHeader,
  decorators: [withDashboardLayoutProviders],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/dashboard");
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
    profileLinkContainer: (
      <ProfileLink userId="user-1" fullName="User 1" imageUrl="/man.jpg" />
    ),
  },
} satisfies Story;
