import { fn, mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { UserTasksPageLayout } from "./UserTasksPageLayout";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { UserTaskList } from "@/components/users/UserTaskList";
import { DetailHeader } from "@/components/common/DetailHeader";
import { UserTasksPageEmptyLayout } from "./UserTasksPageEmptyLayout";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserTasksPageLoadingLayout } from "./UserTasksPageLoadingLayout";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { PersonDetailHeaderImage } from "@/components/common/PersonDetailHeaderImage";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";
import { Default as NewTaskFormStory } from "@/components/tasks/NewTaskForm/NewTaskForm.stories";
import { Default as UserTaskListStory } from "@/components/users/UserTaskList/UserTaskList.stories";
import { Default as ProfileNavigationDesktopStory } from "../ProfileNavigationDesktop/ProfileNavigationDesktop.stories";

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
    userHeaderContainer: (
      <DetailHeader
        title="John Doe"
        image={<PersonDetailHeaderImage imageUrl="/man.jpg" alt="John Doe" />}
        subtitle="Developer"
      />
    ),
    taskToolbarActionsMenuTrigger: (
      <TaskToolbarActionsMenuTrigger
        guestMode={false}
        deleteAction={fn()}
        updateStatusAction={fn()}
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
