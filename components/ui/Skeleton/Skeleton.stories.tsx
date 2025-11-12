import { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta: Meta<typeof Skeleton> = {
  title: "Components/ui/Skeleton",
  component: Skeleton,
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
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const TextSize: Story = {
  tags: ["!test"],
  render: (args) => {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton size="xs" {...args} />
        <Skeleton size="sm" {...args} />
        <Skeleton size="base" {...args} />
        <Skeleton size="lg" {...args} />
        <Skeleton size="xl" {...args} />
        <Skeleton size="2xl" {...args} />
        <Skeleton size="3xl" {...args} />
        <Skeleton size="4xl" {...args} />
        <Skeleton size="5xl" {...args} />
      </div>
    );
  },
};

export const Circle: Story = {
  tags: ["!test"],
  args: {
    className: "w-10 h-10 rounded-full",
  },
};
