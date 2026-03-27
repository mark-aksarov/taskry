import { type Decorator } from "@storybook/react";
import { DeleteProjectCategoryModal } from "../DeleteProjectCategoryModal";

export const withDeleteProjectCategoryModal: Decorator = (Story) => {
  return (
    <>
      <Story />
      <DeleteProjectCategoryModal
        projectCategoryId={1}
        projectCategoryName="Fake project category"
      />
    </>
  );
};
