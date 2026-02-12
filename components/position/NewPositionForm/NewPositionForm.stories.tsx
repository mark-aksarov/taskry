import { fn } from "storybook/test";
import { NewPositionForm } from "./NewPositionForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OverlayTriggerStateContext } from "react-aria-components";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/positions/NewPositionForm",
  component: NewPositionForm,
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
} satisfies Meta<typeof NewPositionForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createPosition: () => ({ status: "success" }),
  },
} satisfies Story;
