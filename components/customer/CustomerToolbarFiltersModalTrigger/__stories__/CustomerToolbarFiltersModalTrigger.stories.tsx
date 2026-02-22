import {
  CustomerFiltersForm,
  CustomerFiltersFormSkeleton,
} from "../../CustomerFiltersForm";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerFiltersFormStory } from "../../CustomerFiltersForm/__stories__";
import { withCustomerFiltersProvider } from "../../CustomerFiltersContext/__stories__";
import { CustomerToolbarFiltersModalTrigger } from "../CustomerToolbarFiltersModalTrigger";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/customers/CustomerToolbarFiltersModalTrigger ",
  component: CustomerToolbarFiltersModalTrigger,
  decorators: [
    withCustomerFiltersProvider,
    withSelectedItemsProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
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
