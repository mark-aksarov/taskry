import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerFiltersModalTrigger } from "./CustomerFiltersModalTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import {
  CustomerFiltersForm,
  CustomerFiltersFormSkeleton,
} from "../CustomerFiltersForm";
import { Default as CustomerFiltersFormStory } from "../CustomerFiltersForm/CustomerFiltersForm.stories";

const meta = {
  title: "Components/users/CustomerFiltersModalTrigger",
  component: CustomerFiltersModalTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof CustomerFiltersModalTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersForm: <CustomerFiltersForm {...CustomerFiltersFormStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersForm: <CustomerFiltersFormSkeleton />,
  },
} satisfies Story;
