import {
  CustomerFiltersForm,
  CustomerFiltersFormSkeleton,
} from "../../CustomerFiltersForm";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerFiltersFormStory } from "../../CustomerFiltersForm/__stories__";
import { CustomerToolbarFiltersModalTrigger } from "../CustomerToolbarFiltersModalTrigger";

const meta = {
  title: "components/customers/CustomerToolbarFiltersModalTrigger ",
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
