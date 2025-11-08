import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MessageInput } from "./MessageInput";
import { useState } from "react";
import { Attachment, Attachments } from "../../attachments/Attachments";
import Image from "next/image";
import { fn } from "storybook/test";
import {
  withContainerWidth,
  withBackgroundVariant,
} from "@/.storybook/decorators";

const meta = {
  title: "Components/common/MessageInput",
  component: MessageInput,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
  args: {
    onFilesSelect: fn(),
    placeholder: "Placeholder",
  },
} satisfies Meta<typeof MessageInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const MessageInputTemplate = {
  args: {},
  render: (args) => {
    let [files, setFiles] = useState<FileList | null>(null);

    return (
      <div className="flex flex-col gap-4">
        {files && (
          <Attachments>
            {Array.from(files).map((file, index) => (
              <Attachment key={index}>
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  fill
                  className="object-cover"
                />
              </Attachment>
            ))}
          </Attachments>
        )}

        <MessageInput {...args} onFilesSelect={(files) => setFiles(files)} />
      </div>
    );
  },
} satisfies Story;

export const Default = {
  ...MessageInputTemplate,
} satisfies Story;

export const Disabled = {
  ...MessageInputTemplate,
  args: {
    isDisabled: true,
  },
} satisfies Story;
