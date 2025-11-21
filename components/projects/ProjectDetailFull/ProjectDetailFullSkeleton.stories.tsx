import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailFullSkeleton } from "./ProjectDetailFullSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/ProjectDetailFullSkeleton",
  component: ProjectDetailFullSkeleton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px] max-w-full">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectDetailFullSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
