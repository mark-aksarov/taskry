import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailFormSkeleton } from "./ProjectDetailFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/ProjectDetailFormSkeleton",
  component: ProjectDetailFormSkeleton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[350px] max-w-full">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} as Meta<typeof ProjectDetailFormSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
