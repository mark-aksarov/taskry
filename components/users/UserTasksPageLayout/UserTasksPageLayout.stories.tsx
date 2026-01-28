import { fn, mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { UserTasksPageLayout } from "./UserTasksPageLayout";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { UserTaskList } from "@/components/users/UserTaskList";
import { PersonHeader } from "@/components/common/PersonHeader";
import { UserTasksPageEmptyLayout } from "./UserTasksPageEmptyLayout";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserTasksPageLoadingLayout } from "./UserTasksPageLoadingLayout";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";
import { Default as UserTaskListStory } from "@/components/users/UserTaskList/UserTaskList.stories";
import { Default as TaskFormBaseStory } from "@/components/tasks/TaskFormBase/TaskFormBase.stories";
import { Default as PersonHeaderStory } from "@/components/common/PersonHeader/PersonHeader.stories";

const meta = {
  title: "components/users/UserTasksPageLayout",
  component: UserTasksPageLayout,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile/tasks");
  },
} satisfies Meta<typeof UserTasksPageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userTasksContainer: <UserTaskList {...UserTaskListStory.args} />,
    userHeaderContainer: <PersonHeader {...PersonHeaderStory.args} />,
    taskToolbarActionsMenuTrigger: (
      <TaskToolbarActionsMenuTrigger
        guestMode={false}
        deleteAction={fn()}
        updateStatusAction={fn()}
      />
    ),
    navigationDesktop: <ProfileNavigationDesktop />,
    navigationMobile: <ProfileNavigationMobile />,
  },
} satisfies Story;

export const Loading = {
  render: () => <UserTasksPageLoadingLayout {...Default.args} />,
};

export const WithNoTasks = {
  render: () => (
    <UserTasksPageEmptyLayout
      {...Default.args}
      newTaskFormContainer={<NewTaskForm {...TaskFormBaseStory.args} />}
    />
  ),
};
