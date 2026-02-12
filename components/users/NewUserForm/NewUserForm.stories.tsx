import { NewUserForm } from "../NewUserForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";

const meta = {
  title: "components/users/NewUserForm",
  component: NewUserForm,
  decorators: [withOverlayTriggerStateProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof NewUserForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createUser: () => ({ status: "success" }),
  },
} satisfies Story;
