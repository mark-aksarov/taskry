import { fn } from "storybook/test";
import { UserList } from "./UserList";
import { UserListItem } from "../UserListItem";
import { EditUserForm } from "../EditUserForm";
import { UserDetailModal } from "../UserDetailModal";
import type { Meta, StoryObj } from "@storybook/react";
import { UserDetailBottomSheet } from "../UserDetailBottomSheet";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserItemActionMenuTrigger } from "../UserItemActionMenuTrigger";
import { Default as EditUserFormStory } from "../EditUserForm/EditUserForm.stories";
import { Default as UserDetailModalStory } from "../UserDetailModal/UserDetailModal.stories";
import { Default as UserDetailBottomSheetStory } from "../UserDetailBottomSheet/UserDetailBottomSheet.stories";

const mockedUsers = [
  {
    id: "user1",
    fullName: "John Doe",
    email: "user1@example.com",
    imageUrl: "/man.jpg",
    phoneNumber: "+380990000001",
    publicLink: "https://example.com/user1",
    position: { name: "Developer" },
  },
  {
    id: "user2",
    fullName: "Jane Smith",
    email: "user2@example.com",
    imageUrl: "/woman.jpg",
    phoneNumber: "+380990000002",
    publicLink: "https://example.com/user2",
    position: { name: "Designer" },
  },
  {
    id: "user3",
    fullName: "Michael Johnson",
    email: "user3@example.com",
    imageUrl: undefined,
    phoneNumber: "+380990000003",
    publicLink: "https://example.com/user3",
    position: { name: "Product Manager" },
  },
  {
    id: "user4",
    fullName: "Emily Davis",
    email: "user4@example.com",
    imageUrl: undefined,
    phoneNumber: "+380990000004",
    publicLink: "https://example.com/user4",
    position: { name: "Product Manager" },
  },
  {
    id: "user5",
    fullName: "Daniel Wilson",
    email: "user5@example.com",
    imageUrl: undefined,
    phoneNumber: "+380990000005",
    publicLink: "https://example.com/user5",
    position: { name: "Product Manager" },
  },
  {
    id: "user6",
    fullName: "Sophia Martinez",
    email: "user6@example.com",
    imageUrl: "/woman.jpg",
    phoneNumber: "+380990000006",
    publicLink: "https://example.com/user6",
    position: { name: "Designer" },
  },
  {
    id: "user7",
    fullName: "James Brown",
    email: "user7@example.com",
    imageUrl: "/man.jpg",
    phoneNumber: "+380990000007",
    publicLink: "https://example.com/user7",
    position: { name: "Designer" },
  },
  {
    id: "user8",
    fullName: "Olivia Garcia",
    email: "user8@example.com",
    imageUrl: "/woman.jpg",
    phoneNumber: "+380990000008",
    publicLink: "https://example.com/user8",
    position: { name: "Developer" },
  },
  {
    id: "user9",
    fullName: "William Miller",
    email: "user9@example.com",
    imageUrl: "/man.jpg",
    phoneNumber: "+380990000009",
    publicLink: "https://example.com/user9",
    position: { name: "Developer" },
  },
  {
    id: "user10",
    fullName: "Ava Taylor",
    email: "user10@example.com",
    imageUrl: "/woman.jpg",
    phoneNumber: "+380990000010",
    publicLink: "https://example.com/user10",
    position: { name: "Developer" },
  },
];

const meta = {
  title: "Components/users/UserList",
  component: UserList,
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserList>;

export default meta;
type Story = StoryObj<typeof UserList>;

export const Default = {
  args: {
    children: mockedUsers.map((user) => (
      <UserListItem
        key={user.id}
        {...user}
        menuTrigger={
          <UserItemActionMenuTrigger
            showDeleteMenuItem
            guestMode={false}
            editUserFormContainer={<EditUserForm {...EditUserFormStory.args} />}
            userId={user.id}
            userFullName={user.fullName}
            deleteAction={fn()}
          />
        }
        userDetailModal={<UserDetailModal {...UserDetailModalStory.args} />}
        userDetailBottomSheet={
          <UserDetailBottomSheet {...UserDetailBottomSheetStory.args} />
        }
      />
    )),
  },
} satisfies Story;
