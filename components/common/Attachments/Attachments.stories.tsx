import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Attachments } from "./Attachments";
import { Attachment } from "./Attachment";
import Image from "next/image";

const meta = {
  title: "Components/common/Attachments",
  component: Attachments,
  tags: ["autodocs"],
  args: {
    children: null,
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Attachments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Attachments>
        <Attachment>
          <Image
            src="/placeholder.jpg"
            alt="placeholder"
            fill
            className="object-cover"
          />
        </Attachment>
        <Attachment>
          <Image
            src="/placeholder.jpg"
            alt="placeholder"
            fill
            className="object-cover"
          />
        </Attachment>
      </Attachments>
    );
  },
};
