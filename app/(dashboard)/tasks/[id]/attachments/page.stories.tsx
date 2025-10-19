import { Meta, StoryObj } from "@storybook/nextjs-vite";
import TaskAttachmentsPage from "./page";
import { mocked } from "storybook/internal/test";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { PageDecorator } from "@/.storybook/decorators";
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
    mocked(getAttachmentsByTask).mockReturnValue(
      new Promise((res) => res(attachmentsMock)),
    );
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock.slice(0, 5))),
    );
    mocked(usePathname).mockReturnValue("/tasks/1/attachments");
    mocked(useSelectedLayoutSegments).mockReturnValue([
      "(dashboard)",
      "tasks",
      "1",
      "attachments",
    ]);
    mocked(useParams).mockReturnValue({ id: "1" });
  },
} satisfies Meta<typeof TaskAttachmentsPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithNoComments = {
  beforeEach: () => {
    mocked(getAttachmentsByTask).mockReturnValue(new Promise((res) => res([])));
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
