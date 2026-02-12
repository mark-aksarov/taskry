import { fn } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChangePasswordForm } from "../ChangePasswordForm";
import { OverlayTriggerStateContext } from "react-aria-components";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/ChangePasswordForm",
  component: ChangePasswordForm,
  decorators: [
    (Story) => (
      <OverlayTriggerStateContext.Provider value={{ close: fn() } as any}>
        <div className="w-[500px] max-w-full">
          <Story />
        </div>
      </OverlayTriggerStateContext.Provider>
    ),
    withThemedBackground,
  ],
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
