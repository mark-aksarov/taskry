import { EditUserForm } from "../EditUserForm";
import { EditUserModal } from "./EditUserModal";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { UserFormBaseSkeleton } from "../UserFormBase";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as UserFormBaseStory } from "../UserFormBase/UserFormBase.stories";

const meta = {
  title: "Components/users/EditUserModal",
  component: EditUserModal,
  tags: ["autodocs"],
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
    editUserFormContainer: <EditUserForm {...UserFormBaseStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    editUserFormContainer: <UserFormBaseSkeleton />,
  },
} satisfies Story;
