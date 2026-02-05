import ResetPasswordNotFound from "./not-found";
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
    action: () => ({ status: "success" }),
  },
} satisfies Story;

export const NotFound = {
  ...Default,
  render: () => <ResetPasswordNotFound />,
} satisfies Story;
