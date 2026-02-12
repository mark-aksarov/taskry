import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToggleButtonGroup } from "../ToggleButtonGroup";
import { ToggleButton } from "./ToggleButton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta: Meta<typeof ToggleButtonGroup> = {
  title: "Components/ui/ToggleButtonGroup",
  component: ToggleButtonGroup,
  argTypes: {
    orientation: {
      options: ["horizontal", "vertical"],
      control: { type: "radio" },
    },
  },
  args: {
    isDisabled: false,
    orientation: "horizontal",
    defaultSelectedKeys: ["apple"],
    variant: "contrast",
  },
  decorators: [withThemedBackground],
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

export const Contast = {
  ...ToggleButtonGroupTemplate,
} satisfies Story;

export const Primary = {
  ...ToggleButtonGroupTemplate,
  args: {
    ...ToggleButtonGroupTemplate.args,
    variant: "primary",
  },
} satisfies Story;

export const Disabled = {
  ...ToggleButtonGroupTemplate,
  args: {
    isDisabled: true,
  },
} satisfies Story;

export const Vertical = {
  ...ToggleButtonGroupTemplate,
  args: {
    orientation: "vertical",
  },
} satisfies Story;
