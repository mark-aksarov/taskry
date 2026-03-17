import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ButtonSkeleton } from "./ButtonSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "UI/ButtonSkeleton",
  component: ButtonSkeleton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ButtonSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Size = {
  render: (args) => (
    <div className="flex items-start gap-4">
      <ButtonSkeleton size="small" {...args} />
      <ButtonSkeleton size="medium" {...args} />
      <ButtonSkeleton size="large" {...args} />
    </div>
  ),
} satisfies Story;

export const Ghost = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      <ButtonSkeleton size="small" className="w-full" ghost {...args} />
      <ButtonSkeleton size="medium" className="w-full" ghost {...args} />
      <ButtonSkeleton size="large" className="w-full" ghost {...args} />
    </div>
  ),
} satisfies Story;
