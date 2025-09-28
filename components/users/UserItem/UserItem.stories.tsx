import { Meta, StoryObj } from "@storybook/react";
import { UserItem } from "./UserItem";
import { User } from "@/generated/prisma";

const userMock: User = {
  id: "user1",
  name: "John Doe",
  email: "L7L2u@example.com",
  imageUrl: "/man.jpg",
  emailVerified: true,
  phone: "+380999999999",
  createdAt: new Date(),
  updatedAt: new Date(),
  role: "Admin",
  publicLink: "https://example.com",
  positionId: 1,
};

const meta: Meta<typeof UserItem> = {
  title: "Components/users/UserItem",
  component: UserItem,
  tags: ["autodocs"],
  args: {
    user: userMock,
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof UserItem>;

export default meta;
type Story = StoryObj<typeof UserItem>;

export const Default: Story = {};

export const Skeleton: Story = {
  args: {
    user: undefined,
  },
};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
