import { Skeleton } from "./Skeleton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const TextSize = {
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
} satisfies Story;

export const Circle = {
  tags: ["!test"],
  args: {
    className: "w-10 h-10 rounded-full",
  },
} satisfies Story;
