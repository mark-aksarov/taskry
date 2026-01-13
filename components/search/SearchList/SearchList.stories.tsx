import { SearchList } from "./SearchList";
import type { Meta, StoryObj } from "@storybook/react";
import { UserSearchListItem } from "../UserSearchListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const mockedUsers = [
  {
    id: "user1",
    fullName: "John Doe",
    email: "user1@example.com",
    imageUrl: "/man.jpg",
  },
  {
    id: "user2",
    fullName: "Jane Smith",
    email: "user2@example.com",
    imageUrl: "/woman.jpg",
  },
  {
    id: "user3",
    fullName: "Michael Johnson",
    email: "user3@example.com",
    imageUrl: undefined,
  },
  {
    id: "user4",
    fullName: "Emily Davis",
    email: "user4@example.com",
    imageUrl: undefined,
  },
  {
    id: "user5",
    fullName: "Daniel Wilson",
    email: "user5@example.com",
    imageUrl: undefined,
  },
  {
    id: "user6",
    fullName: "Sophia Martinez",
    email: "user6@example.com",
    imageUrl: "/woman.jpg",
  },
  {
    id: "user7",
    fullName: "James Brown",
    email: "user7@example.com",
    imageUrl: "/man.jpg",
  },
  {
    id: "user8",
    fullName: "Olivia Garcia",
    email: "user8@example.com",
    imageUrl: "/woman.jpg",
  },
  {
    id: "user9",
    fullName: "William Miller",
    email: "user9@example.com",
    imageUrl: "/man.jpg",
  },
  {
    id: "user10",
    fullName: "Ava Taylor",
    email: "user10@example.com",
    imageUrl: "/woman.jpg",
  },
];

const meta = {
  title: "Components/search/SearchList",
  component: SearchList,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof SearchList>;

export default meta;
type Story = StoryObj<typeof SearchList>;

export const Default = {
  args: {
    children: mockedUsers.map((user) => (
      <UserSearchListItem key={user.id} {...user} />
    )),
  },
} satisfies Story;
