import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import ProfileTasksPageLoading from "./loading";
import { ProfileTasksPage } from "./ProfileTasksPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { ProfileTasksPageEmpty } from "./ProfileTasksPageEmpty";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTaskList } from "@/components/profile/ProfileTaskList";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProfileNavigationMobile } from "@/components/profile/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/profile/ProfileNavigationDesktop";
import { withTaskComments } from "@/components/tasks/TaskCommentsClientContainer/decorators";
import { Default as TaskFormBaseStory } from "@/components/tasks/TaskFormBase/TaskFormBase.stories";
import { withTaskDetailCompact } from "@/components/tasks/TaskDetailCompactClientContainer/decorators";
import { Default as ProfileHeaderStory } from "@/components/profile/ProfileHeader/ProfileHeader.stories";
import { Default as ProfileTaskListStory } from "@/components/profile/ProfileTaskList/ProfileTaskList.stories";

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
    userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    ProfileTasksContainer: () => (
      <ProfileTaskList {...ProfileTaskListStory.args} />
    ),
    ProfileHeaderContainer: () => (
      <ProfileHeader {...ProfileHeaderStory.args} />
    ),
    NewTaskFormContainer: () => <NewTaskForm {...TaskFormBaseStory.args} />,
    profileNavigationDesktop: <ProfileNavigationDesktop />,
    profileNavigationMobile: <ProfileNavigationMobile />,
  },
} satisfies Story;

export const Loading = {
  render: () => <ProfileTasksPageLoading />,
};

export const WithNoTasks = {
  render: () => <ProfileTasksPageEmpty {...Default.args} />,
};
