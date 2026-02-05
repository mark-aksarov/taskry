import { SignInPage } from "./SignInPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthPageDecorator } from "@/.storybook/AuthPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/pages/SignInPage",
  component: SignInPage,
  parameters: { layout: "fullscreen" },
  decorators: [AuthPageDecorator, withThemedBackground],
} satisfies Meta<typeof SignInPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    action: () => ({ status: "success" }),
  },
} satisfies Story;
