import { NewUserForm } from "../NewUserForm";
import { NewUserModal } from "./NewUserModal";
import { Button } from "@/components/ui/Button";
import { NewUserFormSkeleton } from "../NewUserForm";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as UserFormBaseStory } from "../NewUserForm/NewUserForm.stories";

const meta = {
  title: "Components/users/NewUserModal",
  component: NewUserModal,
  tags: ["autodocs"],
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
    newUserForm: <NewUserForm {...UserFormBaseStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newUserForm: <NewUserFormSkeleton />,
  },
} satisfies Story;
