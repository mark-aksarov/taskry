import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withProjectFiltersProvider } from "../../ProjectFiltersContext/__stories__";
import { ProjectFiltersFormCategoryCheckboxGroup } from "../ProjectFiltersFormCategoryCheckboxGroup";

const meta = {
  title: "components/projects/ProjectFiltersFormCategoryCheckboxGroup",
  component: ProjectFiltersFormCategoryCheckboxGroup,
  decorators: [withProjectFiltersProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectFiltersFormCategoryCheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    categories: [
      {
        id: 1,
        name: "Project Category 1",
      },
      {
        id: 2,
        name: "Project Category 2",
      },
      {
        id: 3,
        name: "Project Category 3",
      },
      {
        id: 4,
        name: "Project Category 4",
      },
      {
        id: 5,
        name: "Project Category 5",
      },
    ],
  },
} satisfies Story;
