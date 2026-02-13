import { TaskGrid } from "../TaskGrid";
import { TaskGridItem } from "../../TaskGridItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItemStory } from "../../TaskGridItem/__stories__";
import { mockedTasks } from "../../TaskList/__stories__/TaskList.stories";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/TaskGrid",
  component: TaskGrid,
  decorators: [withThemedBackground],
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
