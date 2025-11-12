import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AttachmentsField } from "./AttachmentsField";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";

const meta = {
  title: "Components/common/AttachmentsField",
  component: AttachmentsField,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof AttachmentsField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
