import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProfileTasksPage from "./page";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { getUserById } from "@/lib/queries/user";
import { usersMock } from "@/lib/data/__mocks__/users";
import { getTasks } from "@/lib/queries/task";
import { tasksMock } from "@/lib/data/__mocks__/tasks";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";
import { PageDecorator } from "@/.storybook/decorators";

const meta: Meta<typeof ProfileTasksPage> = {
  title: "components/pages/ProfileTasks",
  component: ProfileTasksPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator],
  beforeEach: () => {
    mocked(getTasks).mockReturnValue(new Promise((res) => res(tasksMock)));
    mocked(getUserById).mockReturnValue(
      new Promise((res) => res(usersMock[0])),
    );
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock)),
    );
    mocked(usePathname).mockReturnValue("/profile/tasks");
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  beforeEach: () => {
    mocked(getTasks).mockReturnValue(
      new Promise((res) => setTimeout(() => res(tasksMock), 2000)),
    );
  },
};

export const WithNoTasks = {
  beforeEach: () => {
    mocked(getTasks).mockReturnValue(new Promise((res) => res([])));
  },
} satisfies Story;
