import { Meta, StoryObj } from "@storybook/nextjs-vite";
import TaskCommentsPage from "./page";
import { mocked } from "storybook/internal/test";
import { getCommentsByTask } from "@/lib/queries/comments";
import { commentsMock } from "@/lib/data/__mocks__/comments";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { PageDecorator } from "@/.storybook/decorators";

const meta = {
  title: "components/pages/TaskComments",
  component: TaskCommentsPage,
  parameters: { layout: "fullscreen" },
  args: {
    params: new Promise((resolve) => resolve({ id: "1" })),
  },
  decorators: [PageDecorator],
  beforeEach: () => {
    mocked(getCommentsByTask).mockReturnValue(
      new Promise((res) => res(commentsMock)),
    );
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock.slice(0, 5))),
    );
    mocked(usePathname).mockReturnValue("/tasks/1/comments");
    mocked(useSelectedLayoutSegments).mockReturnValue([
      "(dashboard)",
      "tasks",
      "1",
      "comments",
    ]);
    mocked(useParams).mockReturnValue({ id: "1" });
  },
} satisfies Meta<typeof TaskCommentsPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithNoComments = {
  beforeEach: () => {
    mocked(getCommentsByTask).mockReturnValue(new Promise((res) => res([])));
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
