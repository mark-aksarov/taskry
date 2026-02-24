import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditProjectCategoryModal } from "./EditProjectCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/project-categories/EditProjectCategoryModal",
  component: EditProjectCategoryModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="Edit project category" />
          <Story />
        </DialogTrigger>
      );
    },
    withThemedBackground,
  ],
} satisfies Meta<typeof EditProjectCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectCategoryId: 1,
    projectCategoryName: "Project Category 1",
    updateProjectCategory: () => ({ status: "success" }),
  },
} satisfies Story;
