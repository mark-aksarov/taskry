import ResetPasswordNotFound from "./not-found";
import { ActionState } from "@/lib/actions/types";
import { ResetPasswordPage } from "./ResetPasswordPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthPageDecorator } from "@/.storybook/AuthPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

type StoryArgs = React.ComponentProps<typeof ResetPasswordPage> & {
  actionState: ActionState;
};

const meta = {
  title: "components/pages/ResetPasswordPage",
  component: ResetPasswordPage,
  parameters: { layout: "fullscreen" },
  decorators: [AuthPageDecorator, withThemedBackground],
  argTypes: {
    actionState: {
      control: "select",
      options: [
        "success",
        "validationError",
        "invalidToken",
        "passwordTooShort",
        "passwordTooLong",
        "internalServerError",
        "unknown",
      ],
      table: { defaultValue: { summary: "success" } },
      mapping: {
        success: { status: "success" },
        validationError: { status: "error", errorCode: "validationError" },
        invalidToken: {
          status: "error",
          errorCode: "authServiceError",
          message: "reset",
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
    return <ResetPasswordPage {...args} action={() => args.actionState} />;
  },
} satisfies Story;

export const NotFound = {
  ...Default,
  render: () => <ResetPasswordNotFound />,
} satisfies Story;
