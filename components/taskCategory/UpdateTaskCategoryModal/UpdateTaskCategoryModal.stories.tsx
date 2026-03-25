import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateTaskCategoryModal } from "./UpdateTaskCategoryModal";
import { useUpdateTaskCategory } from "../UpdateTaskCategoryContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateTaskCategoryProvider } from "../UpdateTaskCategoryContext/__stories__";

const meta = {
  title: "components/task-categories/UpdateTaskCategoryModal",
  component: UpdateTaskCategoryModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useUpdateTaskCategory();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button
            label="Edit task category"
            onClick={() => onModalOpenChange(true)}
          />
          <Story />
        </>
      );
    },
    withUpdateTaskCategoryProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UpdateTaskCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskCategoryId: 1,
    taskCategoryName: "Task Category 1",
  },
} satisfies Story;
