import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FieldSkeleton } from "./FieldSkeleton";

const meta = {
  title: "Components/common/FieldSkeleton",
  component: FieldSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof FieldSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
