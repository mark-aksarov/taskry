import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectFiltersForm } from "./ProjectFiltersForm";
import { ProjectCategoryCheckboxGroup } from "../ProjectCategoryCheckboxGroup";
import { CustomerCheckboxGroup } from "@/components/customer/CustomerCheckboxGroup";
import { UserCheckboxGroup } from "@/components/users/UserCheckboxGroup";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as CustomerCheckboxGroupStory } from "@/components/customer/CustomerCheckboxGroup/CustomerCheckboxGroup.stories";
import { Default as ProjectCategoryCheckboxGroupStory } from "@/components/projects/ProjectCategoryCheckboxGroup/ProjectCategoryCheckboxGroup.stories";
import { Default as UserCheckboxGroupStory } from "@/components/users/UserCheckboxGroup/UserCheckboxGroup.stories";

const meta: Meta<typeof ProjectFiltersForm> = {
  title: "Components/projects/ProjectFiltersForm",
  component: ProjectFiltersForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectFiltersForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectCategoryCheckboxGroup: (
      <ProjectCategoryCheckboxGroup
        {...ProjectCategoryCheckboxGroupStory.args}
      />
    ),
    customerCheckboxGroup: (
      <CustomerCheckboxGroup {...CustomerCheckboxGroupStory.args} />
    ),
    userCheckboxGroup: <UserCheckboxGroup {...UserCheckboxGroupStory.args} />,
  },
} satisfies Story;

export const Loading = {
  args: {
    projectCategoryCheckboxGroup: (
      <ProjectCategoryCheckboxGroup categories={[]} />
    ),
    customerCheckboxGroup: <CustomerCheckboxGroup customers={[]} />,
    userCheckboxGroup: <UserCheckboxGroup users={[]} />,
  },
} satisfies Story;
