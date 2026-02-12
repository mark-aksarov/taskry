import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectGridItemSkeleton } from "./ProjectGridItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/projects/ProjectGridItemSkeleton",
  component: ProjectGridItemSkeleton,
  decorators: [
    (Story) => (
      <div className="w-[300px] max-w-full">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectGridItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
