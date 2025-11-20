import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { ProfileTasksPage } from "./ProfileTasksPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import {
  ProfileHeader,
  ProfileHeaderSkeleton,
} from "@/components/profile/ProfileHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProfileTasksMobileLayout } from "@/components/profile/ProfileTasksMobile";
import { ProfileTasksDesktopLayout } from "@/components/profile/ProfileTasksDesktop";
import { Default as ProfileTaskListStory } from "@/components/profile/ProfileTaskList/ProfileTaskList.stories";
import { Default as ProfileHeaderStory } from "@/components/profile/ProfileHeader/ProfileHeader.stories";
import { ProfileTaskList } from "@/components/profile/ProfileTaskList";
import { Repeat } from "@/components/common/Repeat";
import { ProfileTaskListItemSkeleton } from "@/components/profile/ProfileTaskListItem";
import { withTaskDetailCompact } from "@/components/tasks/TaskDetailCompactClientContainer/decorators";
import { withTaskComments } from "@/components/tasks/TaskCommentsClientContainer/decorators";

const meta = {
  title: "components/pages/ProfileTasksPage",
  component: ProfileTasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskDetailCompact,
    withTaskComments,
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile/tasks");
  },
} satisfies Meta<typeof ProfileTasksPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ProfileTasksDesktopContainer: () => (
      <ProfileTasksDesktopLayout {...ProfileTaskListStory.args} />
    ),
    ProfileTasksMobileContainer: () => (
      <ProfileTasksMobileLayout {...ProfileTaskListStory.args} />
    ),
    ProfileHeaderContainer: () => (
      <ProfileHeader {...ProfileHeaderStory.args} />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    ProfileTasksDesktopContainer: () => (
      <ProfileTaskList>
        <Repeat items={10} renderItem={() => <ProfileTaskListItemSkeleton />} />
      </ProfileTaskList>
    ),
    ProfileTasksMobileContainer: () => (
      <ProfileTasksMobileLayout>
        <ProfileTaskList>
          <Repeat
            items={10}
            renderItem={() => <ProfileTaskListItemSkeleton />}
          />
        </ProfileTaskList>
      </ProfileTasksMobileLayout>
    ),
    ProfileHeaderContainer: () => <ProfileHeaderSkeleton />,
  },
} satisfies Story;

export const WithNoTask = {
  args: {
    ProfileTasksDesktopContainer: () => (
      <ProfileTasksDesktopLayout children={null} />
    ),
    ProfileTasksMobileContainer: () => (
      <ProfileTasksMobileLayout children={null} />
    ),
    ProfileHeaderContainer: () => (
      <ProfileHeader {...ProfileHeaderStory.args} />
    ),
  },
} satisfies Story;
