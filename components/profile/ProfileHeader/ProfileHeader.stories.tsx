import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileHeader } from "./ProfileHeader";
import { usersMock } from "@/lib/data/__mocks__/users";
import { mocked } from "storybook/test";
import { getUserById } from "@/lib/queries/user";

const meta = {
  title: "components/profile/ProfileHeader",
  component: ProfileHeader,
  beforeEach: () => {
    mocked(getUserById).mockReturnValue(
      new Promise((res) => res(usersMock[0])),
    );
  },
} satisfies Meta<typeof ProfileHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
