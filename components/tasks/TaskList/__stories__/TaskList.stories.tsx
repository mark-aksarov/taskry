import { TaskList } from "../TaskList";
import { mockedTaskList } from "@/mocks/tasks";
import { TaskListItem } from "../../TaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskListItemStory } from "../../TaskListItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { MockedTaskItemWrapper } from "../../TaskItemWrapper/__stories__";
import { withDeleteTasksProvider } from "../../DeleteTasksProvider/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withUpdateTaskStatusesProvider } from "../../UpdateTaskStatusesProvider/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/tasks/TaskList",
  component: TaskList,
  decorators: [
    withDeleteTasksProvider,
    withUpdateTaskStatusesProvider,
    withViewModeProvider,
    withCurrentUserProvider,
    withPageTransitionProvider,
    withSelectedTasksProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  excludeStories: ["getTaskListItems"],
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedTaskList.map((task) => (
      <MockedTaskItemWrapper key={task.id}>
        <TaskListItem
          {...TaskListItemStory.args}
          {...task}
          showCheckbox={true}
        />
      </MockedTaskItemWrapper>
    )),
  },
} satisfies Story;
