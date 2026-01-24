import { Suspense } from "react";
import { Button } from "@/components/ui/Button";
import { NewPositionForm } from "../NewPositionForm";
import { NewPositionModal } from "./NewPositionModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PositionFormBaseSkeleton } from "../PositionFormBase";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as PositionFormBaseStory } from "../PositionFormBase/PositionFormBase.stories";

const meta = {
  title: "Components/users/NewPositionModal",
  component: NewPositionModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="New Position" />
        <Suspense>
          <Story />
        </Suspense>
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof NewPositionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newPositionForm: <NewPositionForm {...PositionFormBaseStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newPositionForm: <PositionFormBaseSkeleton />,
  },
} satisfies Story;
