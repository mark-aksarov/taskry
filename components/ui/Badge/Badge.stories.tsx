import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./Badge";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";

const meta = {
  title: "Components/ui/Badge",
  component: Badge,
  tags: ["autodocs"],
  decorators: [withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof Badge>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Blue = {
  args: {
    color: "blue",
    children: "Badge",
  },
} satisfies Story;

export const Green = {
  args: {
    color: "green",
    children: "Badge",
  },
} satisfies Story;

export const Gray = {
  args: {
    color: "gray",
    children: "Badge",
  },
} satisfies Story;
