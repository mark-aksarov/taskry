import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewProjectCategoryModal } from "./NewProjectCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { useCreateProjectCategory } from "../CreateProjectCategoryContext";
import { withCreateProjectCategoryProvider } from "../CreateProjectCategoryContext/__stories__";

const meta = {
  title: "components/project-categories/NewProjectCategoryModal",
  component: NewProjectCategoryModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useCreateProjectCategory();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button
            label="New project category"
            onClick={() => onModalOpenChange(true)}
          />
          <Story />
        </>
      );
    },
    withCreateProjectCategoryProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof NewProjectCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
