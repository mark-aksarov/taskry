import { Meta, StoryObj } from "@storybook/nextjs-vite";
import DashboardPage from "./page";
import { PageDecorator } from "@/.storybook/decorators";
import { mocked } from "storybook/test";
import { getActiveProjects, getTotalProjects } from "@/lib/queries/project";
import {
  getActiveTasks,
  getTasks,
  getTasksDone,
  getTotalTasks,
  getUnreadTaskComments,
} from "@/lib/queries/task";
import { mockedTasks } from "@/components/tasks/TaskList";
import { mockedTaskComments } from "@/components/tasks/TaskCommentList";

const meta = {
  title: "components/pages/Dashboard",
  component: DashboardPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator],
  beforeEach: () => {
    const activeProjects = 10;
    let lastTotalProjects = 100;

    mocked(getActiveProjects).mockReturnValue(
      new Promise((res) => res(activeProjects)),
    );
    mocked(getTotalProjects).mockImplementation(
      () =>
        new Promise((res) =>
          res((lastTotalProjects -= lastTotalProjects * 0.1)),
        ),
    );

    const activeTasks = 25;
    const tasksDone = 15;
    let lastTotalTasks = 10;

    mocked(getActiveTasks).mockReturnValue(
      new Promise((res) => res(activeTasks)),
    );
    mocked(getTasksDone).mockReturnValue(new Promise((res) => res(tasksDone)));
    mocked(getTotalTasks).mockImplementation(
      () => new Promise((res) => res((lastTotalTasks += lastTotalTasks * 0.1))),
    );
    mocked(getTasks).mockReturnValue(new Promise((res) => res(mockedTasks)));
    mocked(getUnreadTaskComments).mockReturnValue(
      new Promise((res) => res(mockedTaskComments)),
    );
  },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof DashboardPage>;

export const Default: Story = {};

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
