import { TaskGrid } from "../TaskGrid";
import { mockedTaskList } from "@/mocks/tasks";
import { TaskGridItem } from "../../TaskGridItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItemStory } from "../../TaskGridItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withDeleteTaskModalProvider } from "../../DeleteTaskModal/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { withUpdateTaskStatusesProvider } from "../../UpdateTaskStatusContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withDeleteCommentModalProvider } from "@/components/comments/DeleteCommentModal/__stories__";

const meta = {
  title: "components/tasks/TaskGrid",
  component: TaskGrid,
  decorators: [
    withViewModeProvider,
    withPageTransitionProvider,
    withSelectedTasksProvider,
    withUpdateTaskStatusesProvider,
    withDeleteCommentModalProvider,
    withDeleteTaskModalProvider,
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
          <TaskGridItem {...TaskGridItemStory.args} key={task.id} {...task} />
        ))}
      </>
    ),
  },
} satisfies Story;
