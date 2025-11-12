import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AttachmentsField } from "./AttachmentsField";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/common/AttachmentsField",
  component: AttachmentsField,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof AttachmentsField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
