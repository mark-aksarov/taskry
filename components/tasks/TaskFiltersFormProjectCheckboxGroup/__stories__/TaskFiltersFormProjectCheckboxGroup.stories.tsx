import { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskFiltersFormProjectCheckboxGroup } from "../TaskFiltersFormProjectCheckboxGroup";

const meta = {
  title: "components/tasks/TaskFiltersFormProjectCheckboxGroup",
  component: TaskFiltersFormProjectCheckboxGroup,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskFiltersFormProjectCheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projects: [
      {
        id: 1,
        title: "Project 1",
      },
      {
        id: 2,
        title: "Project 2",
      },
      {
        id: 3,
        title: "Project 3",
      },
      {
        id: 4,
        title: "Project 4",
      },
      {
        id: 5,
        title: "Project 5",
      },
      {
        id: 6,
        title: "Project 6",
      },
      {
        id: 7,
        title: "Project 7",
      },
      {
        id: 8,
        title: "Project 8",
      },
      {
        id: 9,
        title: "Project 9",
      },
      {
        id: 10,
        title: "Project 10",
      },
    ],
  },
} satisfies Story;
