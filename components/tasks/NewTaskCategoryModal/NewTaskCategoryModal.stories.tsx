import {
  TaskCategoryFormBase,
  TaskCategoryFormBaseSkeleton,
} from "../TaskCategoryFormBase";

import { fn } from "storybook/test";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewTaskCategoryModal } from "./NewTaskCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/Tasks/NewTaskCategoryModal",
  component: NewTaskCategoryModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="New Task" />
        <Story />
      </DialogTrigger>
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
