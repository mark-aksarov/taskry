import { TaskFiltersForm } from "../TaskFiltersForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskFiltersFormProjectCheckboxGroup } from "../../TaskFiltersFormProjectCheckboxGroup";
import { TaskFiltersFormStatusCheckboxGroup } from "../../TaskFiltersFormStatusCheckboxGroup";
import { TaskFiltersFormAssigneeCheckboxGroup } from "../../TaskFiltersFormAssigneeCheckboxGroup";
import { TaskFiltersFormCategoryCheckboxGroup } from "../../TaskFiltersFormCategoryCheckboxGroup";
import { TaskFiltersFormStatusCheckboxGroupStory } from "../../TaskFiltersFormStatusCheckboxGroup/__stories__";
import { TaskFiltersFormCategoryCheckboxGroupStory } from "../../TaskFiltersFormCategoryCheckboxGroup/__stories__";
import { TaskFiltersFormAssigneeCheckboxGroupStory } from "../../TaskFiltersFormAssigneeCheckboxGroup/__stories__";
import { TaskFiltersFormProjectCheckboxGroupStory } from "../../TaskFiltersFormProjectCheckboxGroup/__stories__";

const meta: Meta<typeof TaskFiltersForm> = {
  title: "components/tasks/TaskFiltersForm",
  component: TaskFiltersForm,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskFiltersForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    statusCheckboxGroup: (
      <TaskFiltersFormStatusCheckboxGroup
        {...TaskFiltersFormStatusCheckboxGroupStory.args}
      />
    ),
    categoryCheckboxGroup: (
      <TaskFiltersFormCategoryCheckboxGroup
        {...TaskFiltersFormCategoryCheckboxGroupStory.args}
      />
    ),
    projectCheckboxGroup: (
      <TaskFiltersFormProjectCheckboxGroup
        {...TaskFiltersFormProjectCheckboxGroupStory.args}
      />
    ),
    assigneeCheckboxGroup: (
      <TaskFiltersFormAssigneeCheckboxGroup
        {...TaskFiltersFormAssigneeCheckboxGroupStory.args}
      />
    ),
  },
} satisfies Story;
