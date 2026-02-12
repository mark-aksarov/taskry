import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReplyButton } from "./ReplyButton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/comments/ReplyButton",
  component: ReplyButton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ReplyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
