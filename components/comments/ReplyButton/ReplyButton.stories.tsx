import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReplyButton } from "./ReplyButton";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";

const meta = {
  title: "Components/comments/ReplyButton",
  component: ReplyButton,
  tags: ["autodocs"],
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof ReplyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
