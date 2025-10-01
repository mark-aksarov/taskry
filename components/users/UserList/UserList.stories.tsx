import { Meta, StoryObj } from "@storybook/react";
import { UserList } from "./UserList";
import { Suspense } from "react";
import { usersMock } from "../usersMock";
import { getUsers } from "@/lib/queries/user";
import { mocked } from "storybook/internal/test";

const meta: Meta<typeof UserList> = {
  title: "Components/users/UserList",
  component: UserList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Suspense>
        <Story />
      </Suspense>
    ),
  ],
  beforeEach: () => {
    mocked(getUsers).mockReturnValue(new Promise((res) => res(usersMock)));
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof UserList>;

export default meta;
type Story = StoryObj<typeof UserList>;

export const Default: Story = {};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
