import { fn } from "storybook/test";
import { NewUserForm } from "../NewUserForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OverlayTriggerStateContext } from "react-aria-components";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/NewUserForm",
  component: NewUserForm,
  tags: ["autodocs"],
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
} satisfies Meta<typeof NewUserForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    formAction: fn(),
  },
} satisfies Story;
