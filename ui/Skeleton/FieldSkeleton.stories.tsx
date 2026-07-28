import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FieldGroupSkeleton, FieldSkeleton } from "./FieldSkeleton";

const meta = {
  title: "UI/FieldSkeleton",
  component: FieldSkeleton,
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof FieldSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: <FieldGroupSkeleton />,
  },
} satisfies Story;
