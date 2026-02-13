import { CustomerGrid } from "../CustomerGrid";
import type { Meta, StoryObj } from "@storybook/react";
import { CustomerGridItem } from "../../CustomerGridItem";
import { mockedCustomers } from "../../CustomerList/__stories__";
import { CustomerGridItemStory } from "../../CustomerGridItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/customers/CustomerGrid",
  component: CustomerGrid,
  decorators: [withThemedBackground],
} satisfies Meta<typeof CustomerGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedCustomers.map((customer) => (
      <CustomerGridItem
        key={customer.id}
        {...CustomerGridItemStory.args}
        {...customer}
      />
    )),
  },
} satisfies Story;
