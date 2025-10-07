import { usersMock } from "../usersMock";
import { UserItem } from "./UserItem";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserItem> = {
  title: "Components/users/UserItem",
  component: UserItem,
  tags: ["autodocs"],
  args: {
    user: usersMock[0],
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
