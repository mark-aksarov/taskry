import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCategoryCheckboxGroup } from "./ProjectCategoryCheckboxGroup";

const meta = {
  title: "Components/projects/ProjectCategoryCheckboxGroup",
  component: ProjectCategoryCheckboxGroup,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectCategoryCheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    categories: [
      {
        id: 1,
        name: "Design & UX",
      },
      {
        id: 2,
        name: "Development & Engineering",
      },
      {
        id: 3,
        name: "Marketing & Strategy",
      },
      {
        id: 4,
        name: "Data & Analytics",
      },
      {
        id: 5,
        name: "SEO Optimization",
      },
    ],
  },
} satisfies Story;
