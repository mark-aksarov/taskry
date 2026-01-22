import {
  ProjectCategoryFormBase,
  ProjectCategoryFormBaseSkeleton,
} from "../ProjectCategoryFormBase";

import { Suspense } from "react";
import { fn } from "storybook/internal/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, RACDialogTrigger } from "@/components/ui";
import { NewProjectCategoryModal } from "./NewProjectCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/projects/NewProjectCategoryModal",
  component: NewProjectCategoryModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <RACDialogTrigger>
        <Button label="New project" />
        <Suspense>
          <Story />
        </Suspense>
      </RACDialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof NewProjectCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newProjectCategoryForm: <ProjectCategoryFormBase formAction={fn()} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newProjectCategoryForm: <ProjectCategoryFormBaseSkeleton />,
  },
} satisfies Story;
