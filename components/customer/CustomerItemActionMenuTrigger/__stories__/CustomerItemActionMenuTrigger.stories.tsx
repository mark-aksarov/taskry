import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditCustomerForm } from "../../EditCustomerForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { EditCustomerFormStory } from "../../EditCustomerForm/__stories__";
import { CustomerItemActionMenuTrigger } from "../CustomerItemActionMenuTrigger";
import { withDeleteCustomerModalProvider } from "../../DeleteCustomerModal/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/customers/CustomerItemActionMenuTrigger",
  component: CustomerItemActionMenuTrigger,
  decorators: [
    withSelectedItemsProvider,
    withDeleteCustomerModalProvider,
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CustomerItemActionMenuTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    guestMode: false,
    customerId: 1,
    customerFullName: "Customer 1",
    editCustomerFormContainer: (
      <EditCustomerForm {...EditCustomerFormStory.args} />
    ),
  },
};
