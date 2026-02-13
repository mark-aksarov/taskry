import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCategorySelect } from "../TaskCategorySelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/TaskCategorySelect",
  component: TaskCategorySelect,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskCategorySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    categories: [
      {
        id: 1,
        name: "Task Category 1",
      },
      {
        id: 2,
        name: "Task Category 2",
      },
      {
        id: 3,
        name: "Task Category 3",
      },
      {
        id: 4,
        name: "Task Category 4",
      },
      {
        id: 5,
        name: "Task Category 5",
      },
    ],
  },
} satisfies Story;
