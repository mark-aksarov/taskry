import { EditUserForm } from "..";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserPositionSelect } from "../../UserPositionSelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserPositionSelectStory } from "../../UserPositionSelect/__stories__";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";

const meta = {
  title: "components/users/EditUserForm",
  component: EditUserForm,
  decorators: [withOverlayTriggerStateProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof EditUserForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "user-1",
    positionSelect: <UserPositionSelect {...UserPositionSelectStory.args} />,
    updateUser: () => ({ status: "success" }),
  },
} satisfies Story;
