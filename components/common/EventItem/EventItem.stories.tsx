import { Meta, StoryObj } from "@storybook/react";
import { EventItem } from "./EventItem";

const meta = {
  title: "Components/common/EventItem",
  component: EventItem,
  tags: ["autodocs"],
  args: {
    avatarUrl: "/woman.jpg",
    authorName: "Jane Doe",
    action: "created a task",
    date: new Date(),
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
} satisfies Meta<typeof EventItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
