import { Meta, StoryObj } from "@storybook/react";
import { UserList } from "./UserList";
import { usersMock } from "../../../lib/data/__mocks__/users";

const meta: Meta<typeof UserList> = {
  title: "Components/users/UserList",
  component: UserList,
  tags: ["autodocs"],
  args: {
    users: usersMock,
  },
} satisfies Meta<typeof UserList>;

export default meta;
type Story = StoryObj<typeof UserList>;

export const Default: Story = {};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
};
