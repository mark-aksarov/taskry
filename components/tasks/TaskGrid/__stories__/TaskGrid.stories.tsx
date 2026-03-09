import { TaskGrid } from "../TaskGrid";
import { mockedTaskList } from "@/mocks/tasks";
import { TaskGridItem } from "../../TaskGridItem";
import { TaskItemProviders } from "../../TaskItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItemStory } from "../../TaskGridItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteTasksProvider } from "../../DeleteTasksContext/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withUpdateTaskStatusesProvider } from "../../UpdateTaskStatusesContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/tasks/TaskGrid",
  component: TaskGrid,
  decorators: [
    withDeleteTasksProvider,
    withUpdateTaskStatusesProvider,
    withViewModeProvider,
    withPageTransitionProvider,
    withCurrentUserProvider,
    withSelectedTasksProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        {mockedTaskList.map((task) => (
          <TaskItemProviders
            key={task.id}
            taskId={task.id}
            taskStatus={task.status}
            deleteTask={() => ({ status: "success" })}
            updateTaskStatus={() => ({ status: "success" })}
            updateTask={() => ({ status: "success" })}
          >
            <TaskGridItem {...TaskGridItemStory.args} key={task.id} {...task} />
          </TaskItemProviders>
        ))}
      </>
    ),
  },
} satisfies Story;
