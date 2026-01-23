import {
  TaskCategoryFormBase,
  TaskCategoryFormBaseSkeleton,
} from "../TaskCategoryFormBase";

import { Suspense } from "react";
import { fn } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, RACDialogTrigger } from "@/components/ui";
import { NewTaskCategoryModal } from "./NewTaskCategoryModal";
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
    newTaskCategoryForm: <TaskCategoryFormBase formAction={fn()} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newTaskCategoryForm: <TaskCategoryFormBaseSkeleton />,
  },
} satisfies Story;
