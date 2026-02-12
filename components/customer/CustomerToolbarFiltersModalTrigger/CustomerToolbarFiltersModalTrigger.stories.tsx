import {
  CustomerFiltersForm,
  CustomerFiltersFormSkeleton,
} from "../CustomerFiltersForm";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerToolbarFiltersModalTrigger } from "./CustomerToolbarFiltersModalTrigger";
import { Default as CustomerFiltersFormStory } from "../CustomerFiltersForm/CustomerFiltersForm.stories";

const meta = {
  title: "Components/customers/CustomerToolbarFiltersModalTrigger ",
  component: CustomerToolbarFiltersModalTrigger,
  decorators: [withThemedBackground],
} satisfies Meta<typeof CustomerToolbarFiltersModalTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <CustomerFiltersForm {...CustomerFiltersFormStory.args} />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <CustomerFiltersFormSkeleton />,
  },
} satisfies Story;
