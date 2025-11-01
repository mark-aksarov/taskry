import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReplyButton } from "./ReplyButton";

const meta = {
  title: "Components/comments/ReplyButton",
  component: ReplyButton,
  tags: ["autodocs"],
} satisfies Meta<typeof ReplyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
