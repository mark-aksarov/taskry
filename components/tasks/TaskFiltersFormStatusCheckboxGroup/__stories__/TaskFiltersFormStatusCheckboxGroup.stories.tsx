import { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskFiltersFormStatusCheckboxGroup } from "../TaskFiltersFormStatusCheckboxGroup";

const meta = {
  title: "components/tasks/TaskFiltersFormStatusCheckboxGroup",
  component: TaskFiltersFormStatusCheckboxGroup,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskFiltersFormStatusCheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
