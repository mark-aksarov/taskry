import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailSkeleton } from "./ProjectDetailSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/ProjectDetailSkeleton",
  component: ProjectDetailSkeleton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectDetailSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
