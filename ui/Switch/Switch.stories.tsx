import { Switch } from "./Switch";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "UI/Switch",
  component: Switch,
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: "Switch",
  },
} satisfies Story;

export const Selected = {
  args: {
    ...Default.args,
    isSelected: true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
} satisfies Story;
