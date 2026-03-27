import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { DeleteProjectCategoryModal } from "../DeleteProjectCategoryModal";
import { useDeleteProjectCategoryModal } from "../DeleteProjectCategoryModalContext";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withDeleteProjectCategoryModalProvider } from "./withDeleteProjectCategoryModalProvider";
import { withDeleteProjectCategoryProvider } from "../../DeleteProjectCategoryProvider/__stories__";

const meta = {
  title: "components/companies/DeleteProjectCategoryModal",
  component: DeleteProjectCategoryModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useDeleteProjectCategoryModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withDeleteProjectCategoryProvider,
    withDeleteProjectCategoryModalProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof DeleteProjectCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectCategoryId: 1,
    projectCategoryName: "Fake project category",
  },
} satisfies Story;
