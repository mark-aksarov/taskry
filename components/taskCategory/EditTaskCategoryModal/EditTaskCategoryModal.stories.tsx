import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditTaskCategoryModal } from "./EditTaskCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/task-categories/EditTaskCategoryModal",
  component: EditTaskCategoryModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="Edit task category" />
          <Story />
        </DialogTrigger>
      );
    },
    withThemedBackground,
  ],
} satisfies Meta<typeof EditTaskCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskCategoryId: 1,
    taskCategoryName: "Task Category 1",
    updateTaskCategory: () => ({ status: "success" }),
  },
} satisfies Story;
