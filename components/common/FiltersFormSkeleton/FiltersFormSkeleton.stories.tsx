import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FiltersFormSkeleton } from "./FiltersFormSkeleton";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";

const meta: Meta<typeof FiltersFormSkeleton> = {
  title: "Components/common/FiltersFormSkeleton",
  component: FiltersFormSkeleton,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof FiltersFormSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
