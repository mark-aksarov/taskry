import { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/ui/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const TextSize: Story = {
  tags: ["!test"],
  render: (args) => {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="text-xs" {...args} />
        <Skeleton className="text-sm" {...args} />
        <Skeleton className="text-md" {...args} />
        <Skeleton className="text-lg" {...args} />
        <Skeleton className="text-xl" {...args} />
        <Skeleton className="text-2xl" {...args} />
        <Skeleton className="text-3xl" {...args} />
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
