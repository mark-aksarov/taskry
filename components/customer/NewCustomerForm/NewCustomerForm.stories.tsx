import { fn } from "storybook/test";
import { NewCustomerForm } from "./NewCustomerForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomerCompanySelect } from "../CustomerCompanySelect";
import { OverlayTriggerStateContext } from "react-aria-components";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as CustomerCompanySelectStory } from "../CustomerCompanySelect/CustomerCompanySelect.stories";

const meta = {
  title: "components/customers/NewCustomerForm",
  component: NewCustomerForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <OverlayTriggerStateContext.Provider value={{ close: fn() } as any}>
        <div className="max-w-[500px]">
          <Story />
        </div>
      </OverlayTriggerStateContext.Provider>
    ),
    withThemedBackground,
  ],
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
