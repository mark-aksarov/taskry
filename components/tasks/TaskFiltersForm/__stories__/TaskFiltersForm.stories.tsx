import { TaskFiltersForm } from "../TaskFiltersForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskFiltersProvider } from "../../TaskFiltersContext/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { TaskFiltersFormStatusCheckboxGroup } from "../../TaskFiltersFormStatusCheckboxGroup";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";
import { TaskFiltersFormProjectCheckboxGroup } from "../../TaskFiltersFormProjectCheckboxGroup";
import { TaskFiltersFormAssigneeCheckboxGroup } from "../../TaskFiltersFormAssigneeCheckboxGroup";
import { TaskFiltersFormCategoryCheckboxGroup } from "../../TaskFiltersFormCategoryCheckboxGroup";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { TaskFiltersFormStatusCheckboxGroupStory } from "../../TaskFiltersFormStatusCheckboxGroup/__stories__";
import { TaskFiltersFormProjectCheckboxGroupStory } from "../../TaskFiltersFormProjectCheckboxGroup/__stories__";
import { TaskFiltersFormCategoryCheckboxGroupStory } from "../../TaskFiltersFormCategoryCheckboxGroup/__stories__";
import { TaskFiltersFormAssigneeCheckboxGroupStory } from "../../TaskFiltersFormAssigneeCheckboxGroup/__stories__";

const meta: Meta<typeof TaskFiltersForm> = {
  title: "components/tasks/TaskFiltersForm",
  component: TaskFiltersForm,
  decorators: [
    withPageTransitionProvider,
    withOverlayTriggerStateProvider,
    withTaskFiltersProvider,
    withSelectedTasksProvider,
    withThemedBackground,
  ],
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
