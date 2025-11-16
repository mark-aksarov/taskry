import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerToolbarFiltersModalTrigger } from "./CustomerToolbarFiltersModalTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import {
  CustomerFiltersForm,
  CustomerFiltersFormSkeleton,
} from "../CustomerFiltersForm";
import { Default as CustomerFiltersFormStory } from "../CustomerFiltersForm/CustomerFiltersForm.stories";

const meta = {
  title: "Components/users/CustomerToolbarFiltersModalTrigger ",
  component: CustomerToolbarFiltersModalTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof CustomerToolbarFiltersModalTrigger>;

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
