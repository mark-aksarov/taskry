import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AttachmentListItem } from "./AttachmentListItem";
import { attachmentsMock } from "@/lib/data/__mocks__/attachments";

const meta = {
  title: "Components/attachments/AttachmentListItem",
  component: AttachmentListItem,
  tags: ["autodocs"],
  args: {
    attachment: attachmentsMock[0],
  },
} satisfies Meta<typeof AttachmentListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
