import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailAltSkeleton } from "./ProjectDetailAltSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/ProjectDetailAltSkeleton",
  component: ProjectDetailAltSkeleton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectDetailAltSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
