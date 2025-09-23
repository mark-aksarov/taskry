import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Components/ui/Badge",
  component: Badge,
  tags: ["autodocs"],
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

export const Red = {
  args: {
    color: "red",
    children: "Badge",
  },
} satisfies Story;

export const Orange = {
  args: {
    color: "orange",
    children: "Badge",
  },
} satisfies Story;
