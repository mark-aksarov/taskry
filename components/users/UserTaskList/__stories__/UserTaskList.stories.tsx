import { UserTaskList } from "../UserTaskList";
import type { Meta, StoryObj } from "@storybook/react";
import { UserTaskListItem } from "../../UserTaskListItem";
import { mockedTasks } from "@/components/tasks/TaskList/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserTaskListItemStory } from "../../UserTaskListItem/__stories__";
import { withDeleteTaskModalProvider } from "@/components/tasks/DeleteTaskModal/__stories__";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withEntityPaginationProvider } from "@/components/common/EntityContainerPagination/__stories__";

const meta = {
  title: "components/users/UserTaskList",
  component: UserTaskList,
  decorators: [
    withEntityPaginationProvider,
    withSelectedTasksProvider,
    withDeleteTaskModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UserTaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedTasks.map((task) => (
      <UserTaskListItem
        key={task.id}
        {...UserTaskListItemStory.args}
        {...task}
      />
    )),
  },
} satisfies Story;
