import { fn } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ForgetPasswordPage } from "./ForgetPasswordPage";
import { AuthPageDecorator } from "@/.storybook/AuthPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/pages/ForgetPasswordPage",
  component: ForgetPasswordPage,
  parameters: { layout: "fullscreen" },
  decorators: [AuthPageDecorator, withThemedBackground],
} satisfies Meta<typeof ForgetPasswordPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    action: fn(),
  },
} satisfies Story;
