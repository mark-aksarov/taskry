import { UserGridItem } from "../UserGridItem";
import type { Meta, StoryObj } from "@storybook/react";
import { UserDetailModal } from "../../UserDetailModal";
import { UserDetailModalStory } from "../../UserDetailModal/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserItemActionMenuTrigger } from "../../UserItemActionMenuTrigger";
import { UserItemActionMenuTriggerStory } from "../../UserItemActionMenuTrigger/__stories__";

const meta = {
  title: "components/users/UserGridItem",
  component: UserGridItem,
  decorators: [withThemedBackground],
  render: (args) => <UserGridItem {...args} />,
} satisfies Meta<typeof UserGridItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: "user1",
    fullName: "User 1",
    email: "user1@example.com",
    imageUrl: "/man.jpg",
    phoneNumber: "+10000000001",
    publicLink: "https://example.com/user1",
    position: {
      name: "Position 1",
    },
    menuTrigger: (
      <UserItemActionMenuTrigger
        {...UserItemActionMenuTriggerStory.args}
        className="-mr-2"
      />
    ),
    userDetailModal: <UserDetailModal {...UserDetailModalStory.args} />,
  },
} satisfies Story;

export const WithoutImagePositionPhoneAndLink = {
  args: {
    ...Default.args,
    imageUrl: undefined,
    position: undefined,
    phoneNumber: undefined,
    publicLink: undefined,
  },
} satisfies Story;
