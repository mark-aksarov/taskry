import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCategoryCheckboxGroupSkeleton } from "./ProjectCategoryCheckboxGroupSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/projects/ProjectCategoryCheckboxGroupSkeleton",
  component: ProjectCategoryCheckboxGroupSkeleton,
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
} satisfies Meta<typeof ProjectCategoryCheckboxGroupSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
