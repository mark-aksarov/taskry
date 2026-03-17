import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FieldGroupSkeleton, FieldSkeleton } from "./FieldSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "UI/FieldSkeleton",
  component: FieldSkeleton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof FieldSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: <FieldGroupSkeleton />,
  },
} satisfies Story;
