import { SwitchSkeleton } from "./SwitchSkeleton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "UI/SwitchSkeleton",
  component: SwitchSkeleton,
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof SwitchSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
