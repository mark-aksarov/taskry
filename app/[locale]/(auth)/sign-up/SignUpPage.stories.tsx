import { SignUpPage } from "./SignUpPage";
import { ActionState } from "@/lib/actions/types";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthPageDecorator } from "@/.storybook/AuthPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

type StoryArgs = React.ComponentProps<typeof SignUpPage> & {
  actionState: ActionState;
};

const meta = {
  title: "components/pages/SignUpPage",
  component: SignUpPage,
  parameters: { layout: "fullscreen" },
  decorators: [AuthPageDecorator, withThemedBackground],
  argTypes: {
    actionState: {
      control: "select",
      options: [
        "success",
        "validationError",
        "registrationNotEnabled",
        "invalidEmail",
        "passwordTooShort",
        "passwordTooLong",
        "userAlreadyExists",
        "userCreationFailed",
        "sessionCreationFailed",
        "internalServerError",
        "unknown",
      ],
      table: { defaultValue: { summary: "success" } },
      mapping: {
        success: { status: "success" },
        validationError: { status: "error", errorCode: "validationError" },
        registrationNotEnabled: {
          status: "error",
          errorCode: "authServiceError",
          message: "not enabled",
        },
        invalidEmail: {
          status: "error",
          errorCode: "authServiceError",
          message: "email address",
        },
        passwordTooShort: {
          status: "error",
          errorCode: "authServiceError",
          message: "too short",
        },
        passwordTooLong: {
          status: "error",
          errorCode: "authServiceError",
          message: "too long",
        },
        userAlreadyExists: {
          status: "error",
          errorCode: "authServiceError",
          message: "already exists",
        },
        userCreationFailed: {
          status: "error",
          errorCode: "authServiceError",
          message: "create user",
        },
        sessionCreationFailed: {
          status: "error",
          errorCode: "authServiceError",
          message: "create session",
        },
        internalServerError: {
          status: "error",
          errorCode: "internalServerError",
        },
        unknown: { status: "error", errorCode: "unknown" },
      },
      description: "Simulate server-side registration responses",
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
    return <SignUpPage {...args} action={() => args.actionState} />;
  },
} satisfies Story;
