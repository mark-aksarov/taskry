import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReplyButton } from "./ReplyButton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "dashboard/comments/ReplyButton",
  component: ReplyButton,
  tags: ["!dev"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof ReplyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
