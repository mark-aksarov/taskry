import { TaskList } from "../TaskList";
import { mockedTaskList } from "@/mocks/tasks";
import { TaskListItem } from "../../TaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskListItemStory } from "../../TaskListItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { withUpdateTaskStatusesProvider } from "../../UpdateTaskStatusContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/tasks/TaskList",
  component: TaskList,
  decorators: [
    withViewModeProvider,
    withPageTransitionProvider,
    withSelectedTasksProvider,
    withUpdateTaskStatusesProvider,
    withThemedBackground,
  ],
  excludeStories: ["getTaskListItems"],
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedTaskList.map((task) => (
      <TaskListItem
        key={task.id}
        {...TaskListItemStory.args}
        {...task}
        showCheckbox={true}
      />
    )),
  },
} satisfies Story;
