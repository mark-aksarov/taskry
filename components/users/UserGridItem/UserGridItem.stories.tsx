import { fn } from "storybook/test";
import { UserGridItem } from "./UserGridItem";
import { EditUserForm } from "../EditUserForm";
import { UserDetailModal } from "../UserDetailModal";
import type { Meta, StoryObj } from "@storybook/react";
import { UserDetailBottomSheet } from "../UserDetailBottomSheet";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserItemActionMenuTrigger } from "../UserItemActionMenuTrigger";
import { Default as EditUserFormStory } from "../EditUserForm/EditUserForm.stories";
import { Default as UserDetailModalStory } from "../UserDetailModal/UserDetailModal.stories";
import { Default as UserDetailBottomSheetStory } from "../UserDetailBottomSheet/UserDetailBottomSheet.stories";

const meta = {
  title: "Components/users/UserGridItem",
  component: UserGridItem,
  decorators: [
    (Story) => (
      <div className="max-w-full md:w-[300px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  render: (args) => (
    <UserGridItem
      {...args}
      menuTrigger={
        <UserItemActionMenuTrigger
          showDeleteMenuItem
          guestMode={false}
          editUserFormContainer={<EditUserForm {...EditUserFormStory.args} />}
          userId={args.id}
          userFullName={args.fullName}
          deleteAction={fn()}
          className="-mr-2"
        />
      }
      userDetailModal={<UserDetailModal {...UserDetailModalStory.args} />}
      userDetailBottomSheet={
        <UserDetailBottomSheet {...UserDetailBottomSheetStory.args} />
      }
    />
  ),
} satisfies Meta<typeof UserGridItem>;

export default meta;
type Story = StoryObj<typeof UserGridItem>;

export const Default = {
  args: {
    id: "user1",
    fullName: "Liam Anderson",
    email: "liam.anderson@example.com",
    imageUrl: "/man.jpg",
    phoneNumber: "+380990001001",
    publicLink: "https://example.com/liam",
    position: {
      name: "Developer",
    },
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
