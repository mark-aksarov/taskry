import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProgressBar } from "../ProgressBar";
import { CheckCheck } from "lucide-react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ui/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ProgressBar
      {...args}
      label={
        <div className="flex items-center gap-1">
          <CheckCheck size={16} strokeWidth={1.5} absoluteStrokeWidth /> 0/30
        </div>
      }
    />
  ),
};

export const Red: Story = {
  args: {
    value: 30,
  },
  render: (args) => (
    <ProgressBar
      {...args}
      label={
        <div className="flex items-center gap-1">
          <CheckCheck size={16} strokeWidth={1.5} absoluteStrokeWidth /> 9/30
        </div>
      }
    />
  ),
};

export const Orange: Story = {
  args: {
    value: 60,
  },
  render: (args) => (
    <ProgressBar
      {...args}
      label={
        <div className="flex items-center gap-1">
          <CheckCheck size={16} strokeWidth={1.5} absoluteStrokeWidth /> 18/30
        </div>
      }
    />
  ),
};

export const Green: Story = {
  args: {
    value: 90,
  },
  render: (args) => (
    <ProgressBar
      {...args}
      label={
        <div className="flex items-center gap-1">
          <CheckCheck size={16} strokeWidth={1.5} absoluteStrokeWidth /> 27/30
        </div>
      }
    />
  ),
};
