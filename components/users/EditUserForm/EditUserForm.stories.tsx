import { fn } from "storybook/test";
import { EditUserForm } from "../EditUserForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserFormBasePositionSelect } from "../UserFormBase";
import { OverlayTriggerStateContext } from "react-aria-components";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/EditUserForm",
  component: EditUserForm,
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
} satisfies Meta<typeof EditUserForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
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
