import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToggleButtonGroup } from "../ToggleButtonGroup";
import { ToggleButton } from "./ToggleButton";

const meta: Meta<typeof ToggleButtonGroup> = {
  title: "Components/ToggleButtonGroup",
  component: ToggleButtonGroup,
  tags: ["autodocs"],
  args: {
    defaultSelectedKeys: ["apple"],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ToggleButtonGroupTemplate: Story = {
  render: (args) => (
    <ToggleButtonGroup {...args}>
      <ToggleButton id="apple">Apple</ToggleButton>
      <ToggleButton id="banana">Banana</ToggleButton>
      <ToggleButton id="oranges">Oranges</ToggleButton>
    </ToggleButtonGroup>
  ),
};

export const Default: Story = {
  ...ToggleButtonGroupTemplate,
};

export const Disabled: Story = {
  ...ToggleButtonGroupTemplate,
  args: {
    isDisabled: true,
  },
};
