import { fn } from "storybook/test";
import { EditUserForm } from "../EditUserForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserPositionSelect } from "../UserPositionSelect";
import { OverlayTriggerStateContext } from "react-aria-components";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as UserPositionSelectStory } from "../UserPositionSelect/UserPositionSelect.stories";

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
    positionSelect: <UserPositionSelect {...UserPositionSelectStory.args} />,
    updateUser: () => ({ status: "success" }),
  },
} satisfies Story;
