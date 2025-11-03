import { usersMock } from "../../../lib/data/__mocks__/users";
import { UserListItem } from "./UserListItem";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserListItem> = {
  title: "Components/users/UserListItem",
  component: UserListItem,
  tags: ["autodocs"],
  args: {
    user: usersMock[0],
  },
} satisfies Meta<typeof UserListItem>;

export default meta;
type Story = StoryObj<typeof UserListItem>;

export const Default: Story = {};

export const Skeleton: Story = {
  args: {
    user: undefined,
  },
};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
};
