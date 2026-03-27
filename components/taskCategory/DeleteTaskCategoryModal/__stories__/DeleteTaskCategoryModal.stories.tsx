import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { DeleteTaskCategoryModal } from "../DeleteTaskCategoryModal";
import { useDeleteTaskCategoryModal } from "../DeleteTaskCategoryModalContext";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withDeleteTaskCategoryModalProvider } from "./withDeleteTaskCategoryModalProvider";
import { withDeleteTaskCategoryProvider } from "../../DeleteTaskCategoryProvider/__stories__";

const meta = {
  title: "components/task-categories/DeleteTaskCategoryModal",
  component: DeleteTaskCategoryModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useDeleteTaskCategoryModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withDeleteTaskCategoryProvider,
    withDeleteTaskCategoryModalProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof DeleteTaskCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskCategoryId: 1,
    taskCategoryName: "Fake task category",
  },
} satisfies Story;
