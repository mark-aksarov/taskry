import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileInfoCard } from "./ProfileInfoCard";
import { mocked } from "storybook/test";
import { getUserById } from "@/lib/queries/user";
import { usersMock } from "@/lib/data/__mocks__/users";
import { usePathname } from "next/navigation";

const meta = {
  title: "components/profile/ProfileInfoCard",
  component: ProfileInfoCard,
  beforeEach: () => {
    mocked(getUserById).mockReturnValue(
      new Promise((res) => res(usersMock[0])),
    );
    mocked(usePathname).mockReturnValue("/profile/info");
  },
} satisfies Meta<typeof ProfileInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
