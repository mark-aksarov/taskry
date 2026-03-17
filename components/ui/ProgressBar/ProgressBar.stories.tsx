import { ProgressBar } from "../ProgressBar";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta: Meta<typeof ProgressBar> = {
  title: "UI/ProgressBar",
  component: ProgressBar,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: (args) => <ProgressBar {...args} label="0/30" />,
} satisfies Story;

export const Red = {
  args: {
    value: 30,
  },
  render: (args) => <ProgressBar {...args} label="9/30" />,
} satisfies Story;

export const Orange = {
  args: {
    value: 60,
  },
  render: (args) => <ProgressBar {...args} label="18/30" />,
} satisfies Story;

export const Green = {
  args: {
    value: 90,
  },
  render: (args) => <ProgressBar {...args} label="27/30" />,
} satisfies Story;
