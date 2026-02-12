import { NewCustomerForm } from "./NewCustomerForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerCompanySelect } from "../CustomerCompanySelect";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";
import { Default as CustomerCompanySelectStory } from "../CustomerCompanySelect/CustomerCompanySelect.stories";

const meta = {
  title: "components/customers/NewCustomerForm",
  component: NewCustomerForm,
  decorators: [withOverlayTriggerStateProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof NewCustomerForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    companySelect: (
      <CustomerCompanySelect {...CustomerCompanySelectStory.args} />
    ),
    createCustomer: () => ({ status: "success" }),
  },
} satisfies Story;
