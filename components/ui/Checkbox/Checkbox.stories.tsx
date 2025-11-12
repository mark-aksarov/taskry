import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { Checkbox } from "../Checkbox";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Components/ui/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    children: "Checkbox",
  },
  decorators: [withBackgroundVariant({ variant: "alt" })],
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
