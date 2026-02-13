import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Attachments } from "./Attachments";
import { Attachment } from "./Attachment";
import Image from "next/image";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/common/Attachments",
  component: Attachments,
  args: {
    children: null,
  },
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof Attachments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
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
} satisfies Story;
