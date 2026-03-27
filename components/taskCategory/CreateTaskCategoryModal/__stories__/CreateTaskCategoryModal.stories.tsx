import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateTaskCategoryModal } from "../CreateTaskCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { useCreateTaskCategoryModal } from "../../CreateTaskCategoryModal";
import { withCreateTaskCategoryModalProvider } from "./withCreateTaskCategoryModalProvider";
import { withCreateTaskCategoryProvider } from "../../CreateTaskCategoryProvider/__stories__";

const meta = {
  title: "components/task-categories/CreateTaskCategoryModal",
  component: CreateTaskCategoryModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useCreateTaskCategoryModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withCreateTaskCategoryProvider,
    withCreateTaskCategoryModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CreateTaskCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
