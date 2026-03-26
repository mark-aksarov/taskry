import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateSubtaskModal } from "../CreateSubtaskModal";
import { useCreateSubtaskModal } from "../CreateSubtaskModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateSubtaskModalProvider } from "./withCreateSubtaskModalProvider";
import { withCreateSubtaskProvider } from "../../CreateSubtaskProvider/__stories__";

const meta = {
  title: "components/companies/CreateSubtaskModal",
  component: CreateSubtaskModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useCreateSubtaskModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withCreateSubtaskProvider,
    withCreateSubtaskModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CreateSubtaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: 1,
  },
} satisfies Story;
