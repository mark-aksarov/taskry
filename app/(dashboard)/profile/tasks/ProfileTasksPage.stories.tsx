import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { ProfileTasksPage } from "./ProfileTasksPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PageDecorator } from "@/.storybook/PageDecorator";
import {
  ProfileTasksMobile,
  ProfileTasksMobileEmpty,
} from "@/components/profile/ProfileTasksMobile";
import {
  ProfileTasksDesktop,
  ProfileTasksDesktopEmpty,
} from "@/components/profile/ProfileTasksDesktop";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { Default as ProfileHeaderStory } from "@/components/profile/ProfileHeader/ProfileHeader.stories";
import { Default as TaskListStory } from "@/components/tasks/TaskList/TaskList.stories";

const meta = {
  title: "components/pages/ProfileTasksPage",
  component: ProfileTasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground()],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile");
  },
} satisfies Meta<typeof ProfileTasksPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ProfileTasksDesktopContainer: () => (
      <ProfileTasksDesktop {...TaskListStory.args} />
    ),
    ProfileTasksMobileContainer: () => (
      <ProfileTasksMobile {...TaskListStory.args} />
    ),
    ProfileHeaderContainer: () => (
      <ProfileHeader {...ProfileHeaderStory.args} />
    ),
  },
};

export const Loading: Story = {
  args: {
    ProfileTasksDesktopContainer: () => <ProfileTasksDesktop />,
    ProfileTasksMobileContainer: () => <ProfileTasksMobile />,
    ProfileHeaderContainer: () => <ProfileHeader />,
  },
};

export const WithNoTask: Story = {
  args: {
    ProfileTasksDesktopContainer: () => <ProfileTasksDesktopEmpty />,
    ProfileTasksMobileContainer: () => <ProfileTasksMobileEmpty />,
    ProfileHeaderContainer: () => (
      <ProfileHeader {...ProfileHeaderStory.args} />
    ),
  },
};
