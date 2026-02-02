import { fn } from "storybook/test";
import { UserFormBase } from "./UserFormBase";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OverlayTriggerStateContext } from "react-aria-components";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserFormBasePositionSelect } from "./UserFormBasePositionSelect";

const meta = {
  title: "components/users/UserFormBase",
  component: UserFormBase,
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
} satisfies Meta<typeof UserFormBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: "new-user-form",
    formAction: fn(),
    positionSelect: (
      <UserFormBasePositionSelect
        positions={[
          { id: 1, name: "Developer" },
          { id: 2, name: "Designer" },
          { id: 3, name: "Product Manager" },
        ]}
      />
    ),
  },
} satisfies Story;
