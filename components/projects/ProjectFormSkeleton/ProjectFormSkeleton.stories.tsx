import { Meta, StoryObj } from "@storybook/react";
import { ProjectFormSkeleton } from "./ProjectFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/ProjectFormSkeleton",
  component: ProjectFormSkeleton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectFormSkeleton>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
