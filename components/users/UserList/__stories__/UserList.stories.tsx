import { UserList } from "../UserList";
import { UserListItem } from "../../UserListItem";
import type { Meta, StoryObj } from "@storybook/react";
import { UserListItemStory } from "../../UserListItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteUserModalProvider } from "../../DeleteUserModal/__stories__";
import { withEntityPaginationProvider } from "@/components/common/EntityContainerPagination/__stories__";

export const mockedUsers = [
  {
    id: "user1",
    fullName: "User 1",
    email: "user1@example.com",
    imageUrl: "/man.jpg",
    phoneNumber: "+10000000001",
    publicLink: "https://example.com/user1",
    position: { name: "Position 1" },
  },
  {
    id: "user2",
    fullName: "User 2",
    email: "user2@example.com",
    imageUrl: "/woman.jpg",
    phoneNumber: "+10000000002",
    publicLink: "https://example.com/user2",
    position: { name: "Position 2" },
  },
  {
    id: "user3",
    fullName: "User 3",
    email: "user3@example.com",
    imageUrl: undefined,
    phoneNumber: "+10000000003",
    publicLink: "https://example.com/user3",
    position: { name: "Position 3" },
  },
  {
    id: "user4",
    fullName: "User 4",
    email: "user4@example.com",
    imageUrl: undefined,
    phoneNumber: "+10000000004",
    publicLink: "https://example.com/user4",
    position: { name: "Position 4" },
  },
  {
    id: "user5",
    fullName: "User 5",
    email: "user5@example.com",
    imageUrl: undefined,
    phoneNumber: "+10000000005",
    publicLink: "https://example.com/user5",
    position: { name: "Position 5" },
  },
  {
    id: "user6",
    fullName: "User 6",
    email: "user6@example.com",
    imageUrl: "/woman.jpg",
    phoneNumber: "+10000000006",
    publicLink: "https://example.com/user6",
    position: { name: "Position 6" },
  },
  {
    id: "user7",
    fullName: "User 7",
    email: "user7@example.com",
    imageUrl: "/man.jpg",
    phoneNumber: "+10000000007",
    publicLink: "https://example.com/user7",
    position: { name: "Position 7" },
  },
  {
    id: "user8",
    fullName: "User 8",
    email: "user8@example.com",
    imageUrl: "/woman.jpg",
    phoneNumber: "+10000000008",
    publicLink: "https://example.com/user8",
    position: { name: "Position 8" },
  },
  {
    id: "user9",
    fullName: "User 9",
    email: "user9@example.com",
    imageUrl: "/man.jpg",
    phoneNumber: "+10000000009",
    publicLink: "https://example.com/user9",
    position: { name: "Position 9" },
  },
  {
    id: "user10",
    fullName: "User 10",
    email: "user10@example.com",
    imageUrl: "/woman.jpg",
    phoneNumber: "+10000000010",
    publicLink: "https://example.com/user10",
    position: { name: "Position 10" },
  },
];

const meta = {
  title: "components/users/UserList",
  component: UserList,
  decorators: [
    withEntityPaginationProvider,
    withDeleteUserModalProvider,
    withThemedBackground,
  ],
  excludeStories: ["mockedUsers"],
} satisfies Meta<typeof UserList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedUsers.map((user) => (
      <UserListItem key={user.id} {...UserListItemStory.args} {...user} />
    )),
  },
} satisfies Story;
