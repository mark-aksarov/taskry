import {
  withUpdateSubtasksForm,
  withUpdateSubtasksFormEmpty,
  withUpdateSubtasksFormSkeleton,
} from "../UpdateSubtasksForm/decorators";
import { Suspense } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, RACDialogTrigger } from "@/components/ui";
import { UpdateSubtasksModal } from "./UpdateSubtasksModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/subtasks/UpdateSubtasksModal",
  component: UpdateSubtasksModal,
  tags: ["autodocs"],
  args: {
    taskId: 1,
  },
  decorators: [
    (Story) => (
      <RACDialogTrigger>
        <Button label="Update subtasks" />
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

export const Default: Story = {
  decorators: [withUpdateSubtasksForm],
};

export const WithEmptyContent = {
  decorators: [withUpdateSubtasksFormEmpty],
};

export const WithSkeletonContent = {
  decorators: [withUpdateSubtasksFormSkeleton],
} satisfies Story;
