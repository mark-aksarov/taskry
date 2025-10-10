import TeamPage from "./page";
import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/decorators";
import { getPositions, getUsers } from "@/lib/queries/user";
import { usersMock } from "@/components/users/usersMock";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/components/notifications/NotificationOverlayList";
import { positionsMock } from "@/components/users/positionsMock";

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
  },
} satisfies Meta<typeof TeamPage>;

export default meta;
type Story = StoryObj<typeof TeamPage>;

export const Default: Story = {};

export const WithNoUsers = {
  beforeEach: () => {
    mocked(getUsers).mockReturnValue(new Promise((res) => res([])));
  },
} satisfies Story;

export const Tablet: Story = {
  globals: {
    viewport: { value: "ipad", isRotated: true },
  },
};

export const Mobile = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
} satisfies Story;
