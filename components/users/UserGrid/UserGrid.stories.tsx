import { fn } from "storybook/test";
import { UserGrid } from "./UserGrid";
import { UserGridItem } from "../UserGridItem";
import { EditUserForm } from "../EditUserForm";
import { UserDetailModal } from "../UserDetailModal";
import type { Meta, StoryObj } from "@storybook/react";
import { UserDetailBottomSheet } from "../UserDetailBottomSheet";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserItemActionMenuTrigger } from "../UserItemActionMenuTrigger";
import { Default as UserFormBaseStory } from "../UserFormBase/UserFormBase.stories";
import { Default as UserDetailModalStory } from "../UserDetailModal/UserDetailModal.stories";
import { Default as UserDetailBottomSheetStory } from "../UserDetailBottomSheet/UserDetailBottomSheet.stories";

const mockedUsers = [
  {
    id: "user1",
    fullName: "Liam Anderson",
    email: "liam.anderson@example.com",
    imageUrl: "/man.jpg",
    phoneNumber: "+380990001001",
    publicLink: "https://example.com/liam",
    position: { name: "Developer" },
  },
  {
    id: "user2",
    fullName: "Emma Thompson",
    email: "emma.thompson@example.com",
    imageUrl: "/woman.jpg",
    phoneNumber: "+380990001002",
    publicLink: "https://example.com/emma",
    position: { name: "Designer" },
  },
  {
    id: "user3",
    fullName: "Noah Robinson",
    email: "noah.robinson@example.com",
    imageUrl: undefined,
    phoneNumber: "+380990001003",
    publicLink: "https://example.com/noah",
    position: { name: "Product Manager" },
  },
  {
    id: "user4",
    fullName: "Isabella Clark",
    email: "isabella.clark@example.com",
    imageUrl: undefined,
    phoneNumber: "+380990001004",
    publicLink: "https://example.com/isabella",
    position: { name: "Product Manager" },
  },
  {
    id: "user5",
    fullName: "Ethan Lewis",
    email: "ethan.lewis@example.com",
    imageUrl: undefined,
    phoneNumber: "+380990001005",
    publicLink: "https://example.com/ethan",
    position: { name: "Developer" },
  },
  {
    id: "user6",
    fullName: "Mia Walker",
    email: "mia.walker@example.com",
    imageUrl: "/woman.jpg",
    phoneNumber: "+380990001006",
    publicLink: "https://example.com/mia",
    position: { name: "Designer" },
  },
  {
    id: "user7",
    fullName: "Alexander Hall",
    email: "alexander.hall@example.com",
    imageUrl: "/man.jpg",
    phoneNumber: "+380990001007",
    publicLink: "https://example.com/alexander",
    position: { name: "Designer" },
  },
  {
    id: "user8",
    fullName: "Sophia Allen",
    email: "sophia.allen@example.com",
    imageUrl: "/woman.jpg",
    phoneNumber: "+380990001008",
    publicLink: "https://example.com/sophia",
    position: { name: "Developer" },
  },
  {
    id: "user9",
    fullName: "James Young",
    email: "james.young@example.com",
    imageUrl: "/man.jpg",
    phoneNumber: "+380990001009",
    publicLink: "https://example.com/james",
    position: { name: "Developer" },
  },
  {
    id: "user10",
    fullName: "Olivia King",
    email: "olivia.king@example.com",
    imageUrl: "/woman.jpg",
    phoneNumber: "+380990001010",
    publicLink: "https://example.com/olivia",
    position: { name: "Developer" },
  },
];

const meta = {
  title: "Components/users/UserGrid",
  component: UserGrid,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserGrid>;

export default meta;
type Story = StoryObj<typeof UserGrid>;

export const Default = {
  args: {
    children: mockedUsers.map((user) => (
      <UserGridItem
        key={user.id}
        {...user}
        menuTrigger={
          <UserItemActionMenuTrigger
            showUserMenuItem
            guestMode={false}
            editUserFormContainer={<EditUserForm {...UserFormBaseStory.args} />}
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
