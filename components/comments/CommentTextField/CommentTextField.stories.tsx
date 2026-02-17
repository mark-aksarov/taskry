import { Meta, StoryObj } from "@storybook/react";
import { CommentTextField } from "./CommentTextField";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCommentFormProvider } from "../withCommentFormProvider";

const meta = {
  title: "components/comments/CommentTextField",
  component: CommentTextField,
  decorators: [withCommentFormProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CommentTextField>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;

export const Pending = {
  args: {
    isPending: true,
  },
} satisfies Story;
