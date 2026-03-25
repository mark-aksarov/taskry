import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateTaskCategoryModal } from "./CreateTaskCategoryModal";
import { useCreateTaskCategory } from "../CreateTaskCategoryContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateTaskCategoryProvider } from "../CreateTaskCategoryContext/__stories__";

const meta = {
  title: "components/task-categories/CreateTaskCategoryModal",
  component: CreateTaskCategoryModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useCreateTaskCategory();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button
            label="New task Category"
            onClick={() => onModalOpenChange(true)}
          />
          <Story />
        </>
      );
    },
    withCreateTaskCategoryProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CreateTaskCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createTaskCategory: () => ({ status: "success" }),
  },
} satisfies Story;
