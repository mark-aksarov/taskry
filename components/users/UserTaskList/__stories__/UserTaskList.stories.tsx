import { UserTaskList } from "../UserTaskList";
import { mockedTaskList } from "@/mocks/tasks";
import type { Meta, StoryObj } from "@storybook/react";
import { UserTaskListItem } from "../../UserTaskListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserTaskListItemStory } from "../../UserTaskListItem/__stories__";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusContext/__stories__";
import { withDeleteCommentModalProvider } from "@/components/comments/DeleteCommentModal/__stories__";

const meta = {
  title: "components/users/UserTaskList",
  component: UserTaskList,
  decorators: [
    withPageTransitionProvider,
    withSelectedTasksProvider,
    withUpdateTaskStatusesProvider,
    withDeleteCommentModalProvider,
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
      />
    )),
  },
} satisfies Story;
