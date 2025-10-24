import { Meta, StoryObj } from "@storybook/nextjs-vite";
import TaskAttachmentsPage from "./page";
import { mocked } from "storybook/internal/test";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";
import { useParams, usePathname } from "next/navigation";
import { getTask } from "@/lib/queries/task";
import { PageDecorator } from "@/.storybook/decorators";
import { tasksMock } from "@/lib/data/__mocks__/tasks";
import { getAttachmentsByTask } from "@/lib/queries/attachments";
import { attachmentsMock } from "@/lib/data/__mocks__/attachments";

const meta = {
  title: "components/pages/TaskAttachments",
  component: TaskAttachmentsPage,
  parameters: { layout: "fullscreen" },
  args: {
    params: new Promise((resolve) => resolve({ id: "1" })),
  },
  decorators: [PageDecorator],
  beforeEach: () => {
    mocked(getTask).mockReturnValue(new Promise((res) => res(tasksMock[0])));
    mocked(getAttachmentsByTask).mockReturnValue(
      new Promise((res) => res(attachmentsMock)),
    );
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock.slice(0, 5))),
    );
    mocked(usePathname).mockReturnValue("/tasks/1/attachments");
    mocked(useParams).mockReturnValue({ id: "1" });
  },
} satisfies Meta<typeof TaskAttachmentsPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  beforeEach: () => {
    mocked(getTask).mockReturnValue(
      new Promise((res) => setTimeout(() => res(tasksMock[0]), 2000)),
    );
    mocked(getAttachmentsByTask).mockReturnValue(
      new Promise((res) => setTimeout(() => res(attachmentsMock), 2000)),
    );
  },
};

export const WithNoAttachments = {
  beforeEach: () => {
    mocked(getAttachmentsByTask).mockReturnValue(new Promise((res) => res([])));
  },
} satisfies Story;
