import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AttachmentList } from "./AttachmentList";
import { attachmentsMock } from "@/lib/data/__mocks__/attachments";

const meta = {
  title: "Components/attachments/AttachmentList",
  component: AttachmentList,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    attachments: attachmentsMock,
  },
} satisfies Meta<typeof AttachmentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
