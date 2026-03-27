import { type Decorator } from "@storybook/react";
import { UpdateProjectCategoryModal } from "../UpdateProjectCategoryModal";

export const withUpdateProjectCategoryModal: Decorator = (Story) => {
  return (
    <>
      <Story />
      <UpdateProjectCategoryModal
        projectCategoryId={1}
        projectCategoryName="Fake project category"
      />
    </>
  );
};
