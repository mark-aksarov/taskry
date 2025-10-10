import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FiltersFormSkeleton } from "./FiltersFormSkeleton";

const meta: Meta<typeof FiltersFormSkeleton> = {
  title: "Components/common/FiltersFormSkeleton",
  component: FiltersFormSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof FiltersFormSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
