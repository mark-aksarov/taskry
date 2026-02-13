import {
  UserTasksPageLayout,
  UserTasksPageEmptyLayout,
  UserTasksPageLoadingLayout,
} from "@/components/users/UserTasksPageLayout";

import { fn, mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { UserTaskList } from "@/components/users/UserTaskList";
import { DetailHeader } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { NewTaskFormStory } from "@/components/tasks/NewTaskForm/__stories__";
import { UserTaskListStory } from "@/components/users/UserTaskList/__stories__";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";
import { PersonDetailHeaderStory } from "@/components/common/DetailHeader/__stories__";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";
import { ProfileNavigationDesktopStory } from "@/components/users/ProfileNavigationDesktop/__stories__";
import { TaskToolbarActionsMenuTriggerStory } from "@/components/tasks/TaskToolbarActionsMenuTrigger/__stories__";

const meta = {
  title: "pages/ProfileTasksPage",
  component: UserTasksPageLayout,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile/tasks");
    mocked(useParams).mockReturnValue({ id: "user-1" });
  },
} satisfies Meta<typeof UserTasksPageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userTasksContainer: <UserTaskList {...UserTaskListStory.args} />,
    userHeaderContainer: <DetailHeader {...PersonDetailHeaderStory.args} />,
    taskToolbarActionsMenuTrigger: (
      <TaskToolbarActionsMenuTrigger
        {...TaskToolbarActionsMenuTriggerStory.args}
      />
    ),
    navigationDesktop: (
      <ProfileNavigationDesktop {...ProfileNavigationDesktopStory.args} />
    ),
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
      newTaskFormContainer={<NewTaskForm {...NewTaskFormStory.args} />}
    />
  ),
};
