import TeamPage from "./page";
import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/decorators";
import { getPositions, getUsers } from "@/lib/queries/user";
import { usersMock } from "@/lib/data/__mocks__/users";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";
import { positionsMock } from "@/lib/data/__mocks__/positions";
import { usePathname } from "next/navigation";
import { default as PageLoading } from "./loading";

const meta = {
  title: "components/pages/Team",
  component: TeamPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator],
  beforeEach: () => {
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock.slice(0, 5))),
    );
    mocked(getUsers).mockReturnValue(new Promise((res) => res(usersMock)));
    mocked(getPositions).mockReturnValue(
      new Promise((res) => res(positionsMock)),
    );
    mocked(usePathname).mockReturnValue("/team");
  },
} satisfies Meta<typeof TeamPage>;

export default meta;
type Story = StoryObj<typeof TeamPage>;

export const Default: Story = {};

export const Loading: Story = {
  render: () => <PageLoading />,
};

export const WithNoUsers = {
  beforeEach: () => {
    mocked(getUsers).mockReturnValue(new Promise((res) => res([])));
  },
} satisfies Story;
