import { NewUserForm } from "../NewUserForm";
import { NewUserModal } from "./NewUserModal";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewUserFormStory } from "../NewUserForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/NewUserModal",
  component: NewUserModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="New user" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof NewUserModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newUserForm: <NewUserForm {...NewUserFormStory.args} />,
  },
} satisfies Story;
