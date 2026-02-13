import { NewUserForm } from "../../NewUserForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewUserFormStory } from "../../NewUserForm/__stories__";
import { NewPositionForm } from "@/components/position/NewPositionForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserToolbarCreateNewMenuTrigger } from "../UserToolbarCreateNewMenuTrigger";

const meta = {
  title: "components/users/UserToolbarCreateNewMenuTrigger",
  component: UserToolbarCreateNewMenuTrigger,
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserToolbarCreateNewMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    showCreateNewUserMenuItem: true,
    guestMode: false,
    newUserForm: <NewUserForm {...NewUserFormStory.args} />,
    newPositionForm: (
      <NewPositionForm createPosition={() => ({ status: "success" })} />
    ),
  },
} satisfies Story;
