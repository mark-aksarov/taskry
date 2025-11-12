import { Suspense } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateSubtasksModal } from "./UpdateSubtasksModal";
import { RACDialogTrigger, Skeleton } from "@/components/ui";
import { UpdateSubtasksForm } from "../UpdateSubtasksForm";
import { UpdateSubtasksButton } from "../UpdateSubtasksButton";
import { Default as UpdateSubtasksFormStory } from "@/components/subtasks/UpdateSubtasksForm/UpdateSubtasksForm.stories";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/subtasks/UpdateSubtasksModal",
  component: UpdateSubtasksModal,
  tags: ["autodocs"],
  args: {
    updateSubtasksForm: (
      <Suspense fallback={<Skeleton />}>
        <UpdateSubtasksForm {...UpdateSubtasksFormStory.args} />
      </Suspense>
    ),
  },
  decorators: [
    (Story) => (
      <RACDialogTrigger>
        <UpdateSubtasksButton />
        <Suspense>
          <Story />
        </Suspense>
      </RACDialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof UpdateSubtasksModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
