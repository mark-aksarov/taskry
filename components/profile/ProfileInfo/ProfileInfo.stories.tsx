import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileInfo } from "./ProfileInfo";
import { usersMock } from "@/lib/data/__mocks__/users";

const meta = {
  title: "components/profile/ProfileInfo",
  component: ProfileInfo,
  tags: ["autodocs"],
  args: {
    userPromise: new Promise((resolve) => resolve(usersMock[0])),
  },
} satisfies Meta<typeof ProfileInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
