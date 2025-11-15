import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerFiltersBottomSheetTrigger } from "./CustomerFiltersBottomSheetTrigger";
import {
  CustomerFiltersForm,
  CustomerFiltersFormSkeleton,
} from "../CustomerFiltersForm";
import { Default as CustomerFiltersFormStory } from "../CustomerFiltersForm/CustomerFiltersForm.stories";

const meta = {
  title: "Components/users/CustomerFiltersBottomSheetTrigger",
  component: CustomerFiltersBottomSheetTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  globals: {
    viewport: "mobile2",
  },
} satisfies Meta<typeof CustomerFiltersBottomSheetTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filtersForm: <CustomerFiltersForm {...CustomerFiltersFormStory.args} />,
  },
};

export const Skeleton: Story = {
  args: {
    filtersForm: <CustomerFiltersFormSkeleton />,
  },
};
