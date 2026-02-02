import { NewUserForm } from "../NewUserForm";
import { NewUserModal } from "./NewUserModal";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { UserFormBaseSkeleton } from "../UserFormBase";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as UserFormBaseStory } from "../UserFormBase/UserFormBase.stories";

const meta = {
  title: "Components/Users/NewUserModal",
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
    newUserFormContainer: <NewUserForm {...UserFormBaseStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newUserFormContainer: <UserFormBaseSkeleton />,
  },
} satisfies Story;
