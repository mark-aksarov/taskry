import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CreateProjectCategoryModal } from "../CreateProjectCategoryModal";
import { useCreateProjectCategoryModal } from "../CreateProjectCategoryModalContext";
import { withCreateProjectCategoryModalProvider } from "./withCreateProjectCategoryModalProvider";
import { withCreateProjectCategoryProvider } from "../../CreateProjectCategoryProvider/__stories__";

const meta = {
  title: "components/project-categories/CreateProjectCategoryModal",
  component: CreateProjectCategoryModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useCreateProjectCategoryModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withCreateProjectCategoryProvider,
    withCreateProjectCategoryModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CreateProjectCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
