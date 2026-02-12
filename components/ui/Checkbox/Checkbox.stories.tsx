import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Checkbox } from "../Checkbox";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  args: {
    children: "Checkbox",
  },
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Selected = {
  args: {
    isSelected: true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    isDisabled: true,
  },
} satisfies Story;
