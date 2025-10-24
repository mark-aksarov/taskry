import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProfilePage from "./page";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { getUserById } from "@/lib/queries/user";
import { usersMock } from "@/lib/data/__mocks__/users";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";
import { PageDecorator } from "@/.storybook/decorators";

const meta: Meta<typeof ProfilePage> = {
  title: "components/pages/Profile",
  component: ProfilePage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator],
  beforeEach: () => {
    mocked(getUserById).mockReturnValue(
      new Promise((res) => res(usersMock[0])),
    );
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock.slice(0, 5))),
    );
    mocked(usePathname).mockReturnValue("/profile");
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  beforeEach: () => {
    mocked(getUserById).mockReturnValue(
      new Promise((res) => setTimeout(() => res(usersMock[0]), 2000)),
    );
  },
};
