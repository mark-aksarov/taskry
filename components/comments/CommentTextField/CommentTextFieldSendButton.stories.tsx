import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentTextFieldSendButton } from "./CommentTextFieldSendButton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/comments/CommentTextFieldSendButton",
  component: CommentTextFieldSendButton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CommentTextFieldSendButton>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;

export const Disabled = {
  args: {
    isDisabled: true,
  },
} satisfies Story;
