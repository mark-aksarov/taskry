import { GuestSignInPage } from "./GuestSignInPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthPageDecorator } from "@/.storybook/AuthPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "pages/GuestSignInPage",
  component: GuestSignInPage,
  parameters: { layout: "fullscreen" },
  decorators: [AuthPageDecorator, withThemedBackground],
} satisfies Meta<typeof GuestSignInPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    signIn: () => ({ status: "success" }),
  },
} satisfies Story;
