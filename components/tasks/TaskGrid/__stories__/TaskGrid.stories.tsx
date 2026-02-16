import { TaskGrid } from "../TaskGrid";
import { TaskGridItem } from "../../TaskGridItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItemStory } from "../../TaskGridItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedTasks } from "../../TaskList/__stories__/TaskList.stories";
import { withDeleteTaskModalProvider } from "../../DeleteTaskModal/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { withEntityPaginationProvider } from "@/components/common/EntityContainerPagination/__stories__";

const meta = {
  title: "components/tasks/TaskGrid",
  component: TaskGrid,
  decorators: [
    withEntityPaginationProvider,
    withSelectedTasksProvider,
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
        {mockedTasks.map((task) => (
          <TaskGridItem {...TaskGridItemStory.args} key={task.id} {...task} />
        ))}
      </>
    ),
  },
} satisfies Story;
