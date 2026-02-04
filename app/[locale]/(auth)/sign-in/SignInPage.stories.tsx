import { SignInPage } from "./SignInPage";
import { ActionState } from "@/lib/actions/types";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthPageDecorator } from "@/.storybook/AuthPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

type StoryArgs = React.ComponentProps<typeof SignInPage> & {
  actionState: ActionState;
};

const meta = {
  title: "components/pages/SignInPage",
  component: SignInPage,
  parameters: { layout: "fullscreen" },
  decorators: [AuthPageDecorator, withThemedBackground],
  argTypes: {
    actionState: {
      control: "select",
      options: [
        "success",
        "validationError",
        "authNotEnabled",
        "invalidEmail",
        "invalidCredentials",
        "emailNotVerified",
        "sessionCreationFailed",
        "internalServerError",
        "unknown",
      ],
      table: { defaultValue: { summary: "success" } },
      mapping: {
        success: { status: "success" },
        validationError: { status: "error", errorCode: "validationError" },
        authNotEnabled: {
          status: "error",
          errorCode: "authServiceError",
          message: "not enabled",
        },
        invalidEmail: {
          status: "error",
          errorCode: "authServiceError",
          message: "email address",
        },
        invalidCredentials: {
          status: "error",
          errorCode: "authServiceError",
          message: "email or password",
        },
        emailNotVerified: {
          status: "error",
          errorCode: "authServiceError",
          message: "not verified",
        },
        sessionCreationFailed: {
          status: "error",
          errorCode: "authServiceError",
          message: "session",
        },
        internalServerError: {
          status: "error",
          errorCode: "internalServerError",
        },
        unknown: { status: "error", errorCode: "unknown" },
      },
      description: "Selecting a state to simulate a server response",
    },
  },
} satisfies Meta<StoryArgs>;

export default meta;
export type Story = StoryObj<StoryArgs>;

export const Default = {
  args: {
    actionState: { status: "success" },
  },
  render: (args) => {
    return <SignInPage {...args} action={() => args.actionState} />;
  },
} satisfies Story;
