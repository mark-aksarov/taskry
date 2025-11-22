import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserHeader } from "@/components/users/UserHeader";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { UserTasksPageLayout } from "./UserTasksPageLayout";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { UserTaskList } from "@/components/users/UserTaskList";
import { UserTasksPageEmptyLayout } from "./UserTasksPageEmptyLayout";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserTasksPageLoadingLayout } from "./UserTasksPageLoadingLayout";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";
import { withTaskComments } from "@/components/tasks/TaskCommentsClientContainer/decorators";
import { Default as UserHeaderStory } from "@/components/users/UserHeader/UserHeader.stories";
import { Default as UserTaskListStory } from "@/components/users/UserTaskList/UserTaskList.stories";
import { Default as TaskFormBaseStory } from "@/components/tasks/TaskFormBase/TaskFormBase.stories";
import { withTaskDetailCompact } from "@/components/tasks/TaskDetailCompactClientContainer/decorators";

const meta = {
  title: "components/users/UserTasksPageLayout",
  component: UserTasksPageLayout,
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
} satisfies Meta<typeof UserTasksPageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    UserTasksContainer: () => <UserTaskList {...UserTaskListStory.args} />,
    UserHeaderContainer: () => <UserHeader {...UserHeaderStory.args} />,
    NewTaskFormContainer: () => <NewTaskForm {...TaskFormBaseStory.args} />,
    navigationDesktop: <ProfileNavigationDesktop />,
    navigationMobile: <ProfileNavigationMobile />,
  },
} satisfies Story;

export const Loading = {
  render: () => <UserTasksPageLoadingLayout {...Default.args} />,
};

export const WithNoTasks = {
  render: () => <UserTasksPageEmptyLayout {...Default.args} />,
};
