import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateTaskCategoryModal } from "../UpdateTaskCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { useUpdateTaskCategoryModal } from "../UpdateTaskCategoryModalContext";
import { withUpdateTaskCategoryProvider } from "../../UpdateTaskCategoryProvider/__stories__";
import { withUpdateTaskCategoryModalProvider } from "./withUpdateTaskCategoryModalProvider";

const meta = {
  title: "components/task-categories/UpdateTaskCategoryModal",
  component: UpdateTaskCategoryModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useUpdateTaskCategoryModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withUpdateTaskCategoryProvider,
    withUpdateTaskCategoryModalProvider,
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
