import { Meta, StoryObj } from "@storybook/nextjs-vite";
import DashboardPage from "./page";
import { PageDecorator } from "@/.storybook/decorators";
import { mocked } from "storybook/test";
import { getTotalProjects } from "@/lib/queries/project";
import { getTasks, getTotalTasks } from "@/lib/queries/task";
import { getTotalUsers } from "@/lib/queries/user";
import { getTotalCustomers } from "@/lib/queries/customers";
import { tasksMock } from "@/lib/data/__mocks__/tasks";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";
import { getStorageUsage } from "@/lib/queries/storage";
import { usePathname } from "next/navigation";

const meta = {
  title: "components/pages/Dashboard",
  component: DashboardPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator],
  beforeEach: () => {
    mocked(getTotalProjects).mockImplementation(
      () => new Promise((res) => res(100)),
    );
    mocked(getTotalTasks).mockImplementation(
      () => new Promise((res) => res(600)),
    );
    mocked(getTotalUsers).mockImplementation(
      () => new Promise((res) => res(20)),
    );
    mocked(getTotalCustomers).mockImplementation(
      () => new Promise((res) => res(15)),
    );
    mocked(getTasks).mockReturnValue(new Promise((res) => res(tasksMock)));
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock)),
    );
    mocked(getStorageUsage).mockReturnValue(
      new Promise((res) =>
        res({
          limit: 1000,
          used: 500,
        }),
      ),
    );
    mocked(usePathname).mockReturnValue("/");
  },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof DashboardPage>;

export const Default: Story = {};

export const WithNoTasksAndUsers = {
  beforeEach: () => {
    mocked(getTasks).mockReturnValue(new Promise((res) => res([])));
  },
} satisfies Story;

export const Tablet: Story = {
  globals: {
    viewport: { value: "ipad", isRotated: true },
  },
};

export const Mobile = {
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Story;
