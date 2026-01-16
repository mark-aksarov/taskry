import Image from "next/image";
import { fn } from "storybook/test";
import { useState } from "react";
import { CommentTextField } from "./CommentTextField";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Attachment, Attachments } from "@/components/attachments/Attachments";

const meta = {
  title: "Components/comments/CommentTextField",
  component: CommentTextField,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px] max-w-full">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
  args: {
    onFilesSelect: fn(),
  },
} satisfies Meta<typeof CommentTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

const CommentTextFieldTemplate = {
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

        <CommentTextField
          {...args}
          onFilesSelect={(files) => setFiles(files)}
        />
      </div>
    );
  },
} satisfies Story;

export const Default = {
  ...CommentTextFieldTemplate,
} satisfies Story;

export const Disabled = {
  ...CommentTextFieldTemplate,
  args: {
    isDisabled: true,
  },
} satisfies Story;
