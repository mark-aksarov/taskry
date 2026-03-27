import { type Decorator } from "@storybook/react";
import { DeleteTaskCategoryModal } from "../DeleteTaskCategoryModal";

export const withDeleteTaskCategoryModal: Decorator = (Story) => {
  return (
    <>
      <Story />
      <DeleteTaskCategoryModal
        taskCategoryId={1}
        taskCategoryName="Fake task category"
      />
    </>
  );
};
