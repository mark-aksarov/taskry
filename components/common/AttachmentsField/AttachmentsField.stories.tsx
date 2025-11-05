import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AttachmentsField } from "./AttachmentsField";

const meta = {
  title: "Components/common/AttachmentsField",
  component: AttachmentsField,
  tags: ["autodocs"],
} satisfies Meta<typeof AttachmentsField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
