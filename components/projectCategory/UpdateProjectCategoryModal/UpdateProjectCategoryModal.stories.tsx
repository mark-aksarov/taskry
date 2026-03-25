import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateProjectCategoryModal } from "./UpdateProjectCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { useUpdateProjectCategory } from "../UpdateProjectCategoryContext";
import { withUpdateProjectCategoryProvider } from "../UpdateProjectCategoryContext/__stories__";

const meta = {
  title: "components/project-categories/UpdateProjectCategoryModal",
  component: UpdateProjectCategoryModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useUpdateProjectCategory();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button
            label="Edit project category"
            onClick={() => onModalOpenChange(true)}
          />
          <Story />
        </>
      );
    },
    withUpdateProjectCategoryProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UpdateProjectCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectCategoryId: 1,
    projectCategoryName: "Project Category 1",
  },
} satisfies Story;
