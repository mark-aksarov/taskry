import { VerifyEmail } from "./VerifyEmail";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthPageDecorator } from "@/.storybook/AuthPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/pages/VerifyEmail",
  component: VerifyEmail,
  parameters: { layout: "fullscreen" },
  decorators: [AuthPageDecorator, withThemedBackground],
} satisfies Meta<typeof VerifyEmail>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    email: "a@b.c",
  },
} satisfies Story;

export const WithError = {
  args: {
    error: "Something went wrong",
    email: "a@b.c",
  },
} satisfies Story;
