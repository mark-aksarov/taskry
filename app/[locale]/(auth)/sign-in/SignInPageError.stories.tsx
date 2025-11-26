import { SignInPageError } from "./SignInPageError";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthPageDecorator } from "@/.storybook/AuthPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/pages/SignInPageError",
  component: SignInPageError,
  parameters: { layout: "fullscreen" },
  decorators: [AuthPageDecorator, withThemedBackground],
} satisfies Meta<typeof SignInPageError>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const EmailNotVerified = {
  args: {
    error: {
      status: 1,
      statusText: "",
      error: "",
      name: "",
      code: "EMAIL_NOT_VERIFIED",
      message: "Your email is not verified",
    },
    sendVerificationEmail: () => new Promise(() => {}),
  },
} satisfies Story;

export const OtherError = {
  args: {
    error: {
      status: 1,
      statusText: "",
      error: "",
      name: "",
      code: "OTHER_ERROR",
      message: "Something went wrong",
    },
    sendVerificationEmail: () => new Promise(() => {}),
  },
} satisfies Story;
