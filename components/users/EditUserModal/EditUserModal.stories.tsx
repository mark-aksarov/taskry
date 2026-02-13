import { EditUserForm } from "../EditUserForm";
import { EditUserModal } from "./EditUserModal";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { EditUserFormSkeleton } from "../EditUserForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditUserFormStory } from "../EditUserForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/EditUserModal",
  component: EditUserModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="Edit user" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof EditUserModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    editUserFormContainer: <EditUserForm {...EditUserFormStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    editUserFormContainer: <EditUserFormSkeleton />,
  },
} satisfies Story;
