import { fn } from "storybook/test";
import { PositionFormBase } from "./PositionFormBase";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OverlayTriggerStateContext } from "react-aria-components";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/PositionFormBase",
  component: PositionFormBase,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <OverlayTriggerStateContext.Provider value={{ close: fn() } as any}>
        <div className="max-w-[500px]">
          <Story />
        </div>
      </OverlayTriggerStateContext.Provider>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof PositionFormBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    formAction: fn(),
    formId: "new-user-form",
  },
} satisfies Story;
