import { UserTaskList } from "../UserTaskList";
import type { Meta, StoryObj } from "@storybook/react";
import { UserTaskListItem } from "../../UserTaskListItem";
import { mockedTasks } from "@/components/tasks/TaskList/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserTaskListItemStory } from "../../UserTaskListItem/__stories__";

const meta = {
  title: "components/users/UserTaskList",
  component: UserTaskList,
  decorators: [withThemedBackground],
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
