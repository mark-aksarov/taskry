import { Badge } from "./Badge";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    backgroundVariant: "alt",
  },
  args: {
    className: "w-[5rem]",
  },
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

export const Orange = {
  args: {
    color: "orange",
    children: "Badge",
  },
} satisfies Story;

export const Red = {
  args: {
    color: "red",
    children: "Badge",
  },
} satisfies Story;
