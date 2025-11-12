import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FiltersFormSkeleton } from "./FiltersFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta: Meta<typeof FiltersFormSkeleton> = {
  title: "Components/common/FiltersFormSkeleton",
  component: FiltersFormSkeleton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof FiltersFormSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
