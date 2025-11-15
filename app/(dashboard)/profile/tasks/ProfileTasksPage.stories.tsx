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
import {
  TaskDetail,
  TaskDetailContainerProvider,
} from "@/components/tasks/TaskDetail";
import { CommentsContainerProvider } from "@/components/comments/CommentsContainer";
import { MockedCommentsContainer } from "@/components/comments/CommentsContainer";
import { Default as TaskDetailStory } from "@/components/tasks/TaskDetail/TaskDetail.stories";
import { ProfileTaskList } from "@/components/profile/ProfileTaskList";
import { Repeat } from "@/components/common/Repeat";
import { ProfileTaskListItemSkeleton } from "@/components/profile/ProfileTaskListItem";

const meta = {
  title: "components/pages/ProfileTasksPage",
  component: ProfileTasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <TaskDetailContainerProvider
        TaskDetailContainer={() => <TaskDetail {...TaskDetailStory.args} />}
      >
        <CommentsContainerProvider
          CommentsContainer={() => <MockedCommentsContainer />}
        >
          <Story />
        </CommentsContainerProvider>
      </TaskDetailContainerProvider>
    ),
    PageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile");
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
      <ProfileTaskList>
        <Repeat items={10} renderItem={() => <ProfileTaskListItemSkeleton />} />
      </ProfileTaskList>
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
