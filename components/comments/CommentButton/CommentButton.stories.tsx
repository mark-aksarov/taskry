import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentButton } from "./CommentButton";
import { Heart, MessageSquare } from "lucide-react";
import React from "react";

const iconOptions = ["Message", "Heart"];
const icons = {
  Message: <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />,
  Heart: <Heart size={16} strokeWidth={1.5} absoluteStrokeWidth />,
};

const meta = {
  title: "Components/comments/CommentButton",
  component: CommentButton,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: {
        type: "select",
      },
      options: iconOptions,
      mapping: icons,
    },
  },
  args: {
    icon: <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />,
    label: 12,
    "aria-label": "Comment Button",
  },
} satisfies Meta<typeof CommentButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultFill: Story = {
  args: {
    icon: <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />,
    fill: true,
  },
};

export const Red: Story = {
  args: {
    color: "red",
    icon: <Heart size={16} strokeWidth={1.5} absoluteStrokeWidth />,
  },
};

export const RedFill: Story = {
  args: {
    color: "red",
    icon: <Heart size={16} strokeWidth={1.5} absoluteStrokeWidth />,
    fill: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const DisabledFill: Story = {
  args: {
    isDisabled: true,
    fill: true,
  },
};
