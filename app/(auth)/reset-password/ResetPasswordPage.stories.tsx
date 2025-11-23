import { fn } from "storybook/test";
import { ResetPasswordPage } from "./ResetPasswordPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthPageDecorator } from "@/.storybook/AuthPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/pages/ResetPasswordPage",
  component: ResetPasswordPage,
  parameters: { layout: "fullscreen" },
  decorators: [AuthPageDecorator, withThemedBackground],
} satisfies Meta<typeof ResetPasswordPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    password: "password",
    setPassword: fn(),
    handleSubmit: fn(),
  },
} satisfies Story;
