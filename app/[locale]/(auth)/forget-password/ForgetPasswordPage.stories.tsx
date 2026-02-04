import { ActionState } from "@/lib/actions/types";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ForgetPasswordPage } from "./ForgetPasswordPage";
import { AuthPageDecorator } from "@/.storybook/AuthPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

type StoryArgs = React.ComponentProps<typeof ForgetPasswordPage> & {
  actionState: ActionState;
};

const meta = {
  title: "components/pages/ForgetPasswordPage",
  component: ForgetPasswordPage,
  parameters: { layout: "fullscreen" },
  decorators: [AuthPageDecorator, withThemedBackground],
  argTypes: {
    actionState: {
      control: "select",
      options: [
        "success",
        "validationError",
        "authServiceError",
        "internalServerError",
        "unknown",
      ],
      table: { defaultValue: { summary: "success" } },
      mapping: {
        success: { status: "success" },
        validationError: { status: "error", errorCode: "validationError" },
        authServiceError: {
          status: "error",
          errorCode: "authServiceError",
          message: "reset",
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
    return <ForgetPasswordPage {...args} action={() => args.actionState} />;
  },
} satisfies Story;
