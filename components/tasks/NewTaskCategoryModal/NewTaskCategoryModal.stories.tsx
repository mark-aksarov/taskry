import { Suspense } from "react";
import { fn } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, RACDialogTrigger } from "@/components/ui";
import { NewTaskCategoryForm } from "../NewTaskCategoryForm";
import { NewTaskCategoryModal } from "./NewTaskCategoryModal";
import { TaskCategoryFormBaseSkeleton } from "../TaskCategoryFormBase";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/Tasks/NewTaskCategoryModal",
  component: NewTaskCategoryModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <RACDialogTrigger>
        <Button label="New Task" />
        <Suspense>
          <Story />
        </Suspense>
      </RACDialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof NewTaskCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newTaskCategoryForm: <NewTaskCategoryForm formAction={fn()} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newTaskCategoryForm: <TaskCategoryFormBaseSkeleton />,
  },
} satisfies Story;
