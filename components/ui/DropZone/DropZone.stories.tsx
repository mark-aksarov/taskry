import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DropZone } from "./DropZone";
import { fn } from "storybook/test";
import { useState } from "react";

const meta = {
  title: "Components/ui/DropZone",
  component: DropZone,
  tags: ["autodocs"],
  args: {
    onFilesSelect: fn(),
  },
  render: (args) => {
    const [files, setFiles] = useState<FileList | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <DropZone {...args} onFilesSelect={setFiles} />
        {files && (
          <div>
            <h3 className="text-lg font-bold">Selected files:</h3>
            <ul>
              {Array.from(files).map((file) => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="h-screen bg-white p-4 dark:bg-gray-800">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
