import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewTaskCategoryModal } from "./NewTaskCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/task-categories/NewTaskCategoryModal",
  component: NewTaskCategoryModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="New task Category" />
          <Story />
        </DialogTrigger>
      );
    },
    withThemedBackground,
  ],
} satisfies Meta<typeof NewTaskCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createTaskCategory: () => ({ status: "success" }),
  },
} satisfies Story;
