import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateSubtasksModal } from "./UpdateSubtasksModal";
import { RACDialogTrigger, Skeleton } from "@/components/ui";
import { Suspense } from "react";
import { UpdateSubtasksForm } from "../UpdateSubtasksForm";
import { UpdateSubtasksButton } from "../UpdateSubtasksButton";

const meta = {
  title: "Components/subtasks/UpdateSubtasksModal",
  component: UpdateSubtasksModal,
  tags: ["autodocs"],
  args: {
    updateSubtasksForm: (
      <Suspense fallback={<Skeleton />}>
        <UpdateSubtasksForm
          initialSubtasks={[
            {
              id: 1,
              name: "Set up project structure",
              isDone: true,
            },
            {
              id: 2,
              name: "Configure server environment",
              isDone: false,
            },
            {
              id: 3,
              name: "Implement authentication endpoints",
              isDone: true,
            },
            {
              id: 4,
              name: "Create user management APIs",
              isDone: false,
            },
            {
              id: 5,
              name: "Develop product CRUD endpoints",
              isDone: false,
            },
          ]}
        />
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
  ],
} satisfies Meta<typeof UpdateSubtasksModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
