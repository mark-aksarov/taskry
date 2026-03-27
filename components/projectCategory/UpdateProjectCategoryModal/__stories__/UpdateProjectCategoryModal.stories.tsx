import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UpdateProjectCategoryModal } from "../UpdateProjectCategoryModal";
import { useUpdateProjectCategoryModal } from "../UpdateProjectCategoryModalContext";
import { withUpdateProjectCategoryProvider } from "../../UpdateProjectCategoryProvider/__stories__";
import { withUpdateProjectCategoryModalProvider } from "./withUpdateProjectCategoryModalProvider";

const meta = {
  title: "components/project-categories/UpdateProjectCategoryModal",
  component: UpdateProjectCategoryModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useUpdateProjectCategoryModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withUpdateProjectCategoryProvider,
    withUpdateProjectCategoryModalProvider,
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
