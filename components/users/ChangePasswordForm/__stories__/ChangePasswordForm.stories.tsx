import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChangePasswordForm } from "../ChangePasswordForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";

const meta = {
  title: "components/users/ChangePasswordForm",
  component: ChangePasswordForm,
  decorators: [withOverlayTriggerStateProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ChangePasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "user-1",
    changePassword: () => ({ status: "success" }),
  },
} satisfies Story;
