import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FieldGroupSkeleton, FieldSkeleton } from "./FieldSkeleton";
import {
  withBackgroundVariant,
  withContainerWidth,
} from "@/.storybook/decorators";

const meta = {
  title: "Components/common/FieldSkeleton",
  component: FieldSkeleton,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof FieldSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: <FieldGroupSkeleton />,
  },
} satisfies Story;
