import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectFormBaseSkeleton } from "./ProjectFormBaseSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/ProjectFormBaseSkeleton",
  component: ProjectFormBaseSkeleton,
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
} as Meta<typeof ProjectFormBaseSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
