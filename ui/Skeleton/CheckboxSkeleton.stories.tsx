import { CheckboxSkeleton } from "./CheckboxSkeleton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "UI/CheckboxSkeleton",
  component: CheckboxSkeleton,
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CheckboxSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
