import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateProjectCategoryModal } from "./CreateProjectCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { useCreateProjectCategory } from "../CreateProjectCategoryContext";
import { withCreateProjectCategoryProvider } from "../CreateProjectCategoryContext/__stories__";

const meta = {
  title: "components/project-categories/CreateProjectCategoryModal",
  component: CreateProjectCategoryModal,
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
} satisfies Meta<typeof CreateProjectCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
