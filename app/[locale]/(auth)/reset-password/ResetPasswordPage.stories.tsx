import ResetPasswordNotFound from "./not-found";
import { ResetPasswordPage } from "./ResetPasswordPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthPageDecorator } from "@/.storybook/AuthPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "pages/ResetPasswordPage",
  component: ResetPasswordPage,
  parameters: { layout: "fullscreen" },
  decorators: [AuthPageDecorator, withThemedBackground],
} satisfies Meta<typeof ResetPasswordPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Reset = {
  args: {
    mode: "reset",
    resetPassword: () => ({ status: "success" }),
  },
} satisfies Story;

export const Invite = {
  args: {
    mode: "invite",
    resetPassword: () => ({ status: "success" }),
  },
} satisfies Story;

export const NotFound = {
  ...Reset,
  render: () => <ResetPasswordNotFound />,
} satisfies Story;
