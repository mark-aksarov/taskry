import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectFiltersForm } from "../ProjectFiltersForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectFiltersFormUserCheckboxGroup } from "../../ProjectFiltersFormUserCheckboxGroup";
import { ProjectFiltersFormStatusCheckboxGroup } from "../ProjectFiltersFormStatusCheckboxGroup";
import { ProjectFiltersFormCustomerCheckboxGroup } from "../../ProjectFiltersFormCustomerCheckboxGroup";
import { ProjectFiltersFormCategoryCheckboxGroup } from "../../ProjectFiltersFormCategoryCheckboxGroup";
import { ProjectFiltersFormUserCheckboxGroupStory } from "../../ProjectFiltersFormUserCheckboxGroup/__stories__";
import { ProjectFiltersFormCategoryCheckboxGroupStory } from "../../ProjectFiltersFormCategoryCheckboxGroup/__stories__";
import { ProjectFiltersFormCustomerCheckboxGroupStory } from "../../ProjectFiltersFormCustomerCheckboxGroup/__stories__";

const meta: Meta<typeof ProjectFiltersForm> = {
  title: "components/projects/ProjectFiltersForm",
  component: ProjectFiltersForm,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectFiltersForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectStatusCheckboxGroup: (
      <ProjectFiltersFormStatusCheckboxGroup filters={{}} />
    ),
    projectCategoryCheckboxGroup: (
      <ProjectFiltersFormCategoryCheckboxGroup
        {...ProjectFiltersFormCategoryCheckboxGroupStory.args}
      />
    ),
    customerCheckboxGroup: (
      <ProjectFiltersFormCustomerCheckboxGroup
        {...ProjectFiltersFormCustomerCheckboxGroupStory.args}
      />
    ),
    userCheckboxGroup: (
      <ProjectFiltersFormUserCheckboxGroup
        {...ProjectFiltersFormUserCheckboxGroupStory.args}
      />
    ),
  },
} satisfies Story;
