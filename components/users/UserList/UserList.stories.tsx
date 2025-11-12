import { Meta, StoryObj } from "@storybook/react";
import { UserList } from "./UserList";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta: Meta<typeof UserList> = {
  title: "Components/users/UserList",
  component: UserList,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserList>;

export default meta;
type Story = StoryObj<typeof UserList>;

export const Default = {
  args: {
    users: [
      {
        id: "user1",
        fullName: "John Doe",
        email: "user1@example.com",
        imageUrl: "/man.jpg",
        phoneNumber: "+380990000001",
        publicLink: "https://example.com/user1",
        position: {
          name: "Developer",
        },
      },
      {
        id: "user2",
        fullName: "Jane Smith",
        email: "user2@example.com",
        imageUrl: "/woman.jpg",
        phoneNumber: "+380990000002",
        publicLink: "https://example.com/user2",
        position: {
          name: "Designer",
        },
      },
      {
        id: "user3",
        fullName: "Michael Johnson",
        email: "user3@example.com",
        imageUrl: null,
        phoneNumber: "+380990000003",
        publicLink: "https://example.com/user3",
        position: {
          name: "Product Manager",
        },
      },
      {
        id: "user4",
        fullName: "Emily Davis",
        email: "user4@example.com",
        imageUrl: null,
        phoneNumber: "+380990000004",
        publicLink: "https://example.com/user4",
        position: {
          name: "Product Manager",
        },
      },
      {
        id: "user5",
        fullName: "Daniel Wilson",
        email: "user5@example.com",
        imageUrl: null,
        phoneNumber: "+380990000005",
        publicLink: "https://example.com/user5",
        position: {
          name: "Product Manager",
        },
      },
      {
        id: "user6",
        fullName: "Sophia Martinez",
        email: "user6@example.com",
        imageUrl: "/woman.jpg",
        phoneNumber: "+380990000006",
        publicLink: "https://example.com/user6",
        position: {
          name: "Designer",
        },
      },
      {
        id: "user7",
        fullName: "James Brown",
        email: "user7@example.com",
        imageUrl: "/man.jpg",
        phoneNumber: "+380990000007",
        publicLink: "https://example.com/user7",
        position: {
          name: "Designer",
        },
      },
      {
        id: "user8",
        fullName: "Olivia Garcia",
        email: "user8@example.com",
        imageUrl: "/woman.jpg",
        phoneNumber: "+380990000008",
        publicLink: "https://example.com/user8",
        position: {
          name: "Developer",
        },
      },
      {
        id: "user9",
        fullName: "William Miller",
        email: "user9@example.com",
        imageUrl: "/man.jpg",
        phoneNumber: "+380990000009",
        publicLink: "https://example.com/user9",
        position: {
          name: "Developer",
        },
      },
      {
        id: "user10",
        fullName: "Ava Taylor",
        email: "user10@example.com",
        imageUrl: "/woman.jpg",
        phoneNumber: "+380990000010",
        publicLink: "https://example.com/user10",
        position: {
          name: "Developer",
        },
      },
    ],
  },
} satisfies Story;
