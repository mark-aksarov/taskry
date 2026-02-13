import { Meta, StoryObj } from "@storybook/react";
import { TaskFiltersFormAssigneeCheckboxGroup } from "../TaskFiltersFormAssigneeCheckboxGroup";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/TaskFiltersFormAssigneeCheckboxGroup",
  component: TaskFiltersFormAssigneeCheckboxGroup,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskFiltersFormAssigneeCheckboxGroup>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    users: [
      { id: "user1", fullName: "User 1" },
      { id: "user2", fullName: "User 2" },
      { id: "user3", fullName: "User 3" },
      { id: "user4", fullName: "User 4" },
      { id: "user5", fullName: "User 5" },
      { id: "user6", fullName: "User 6" },
      { id: "user7", fullName: "User 7" },
      { id: "user8", fullName: "User 8" },
      { id: "user9", fullName: "User 9" },
      { id: "user10", fullName: "User 10" },
    ],
  },
} satisfies Story;
