import { UserTaskList } from "../UserTaskList";
import { mockedTaskList } from "@/mocks/tasks";
import type { Meta, StoryObj } from "@storybook/react";
import { UserTaskListItem } from "../../UserTaskListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserTaskListItemStory } from "../../UserTaskListItem/__stories__";
import { withDeleteTasksProvider } from "@/components/tasks/DeleteTasksProvider/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withCreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskProvider/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesProvider/__stories__";

const meta = {
  title: "components/users/UserTaskList",
  component: UserTaskList,
  decorators: [
    withCreateSubtaskProvider,
    withUpdateTaskStatusesProvider,
    withDeleteTasksProvider,
    withCurrentUserProvider,
    withSelectedTasksProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof UserTaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedTaskList.map((task) => (
      <UserTaskListItem
        key={task.id}
        {...UserTaskListItemStory.args}
        {...task}
        updateTask={() => ({ status: "success" })}
      />
    )),
  },
} satisfies Story;
