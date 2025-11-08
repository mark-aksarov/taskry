import { withBackgroundVariant } from "@/.storybook/decorators";
import { LikeButton } from "./LikeButton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Components/comments/LikeButton",
  component: LikeButton,
  tags: ["autodocs"],
  args: {
    value: 10,
  },
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof LikeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Fill: Story = {
  args: {
    fill: true,
  },
};
