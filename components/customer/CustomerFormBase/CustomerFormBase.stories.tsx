import { fn } from "storybook/test";
import { CustomerFormBase } from "./CustomerFormBase";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerFormBaseCompanySelect } from "./CustomerFormBaseCompanySelect";
import { OverlayTriggerStateContext } from "react-aria-components";

const meta = {
  title: "components/customers/CustomerFormBase",
  component: CustomerFormBase,
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
} satisfies Meta<typeof CustomerFormBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    companySelect: (
      <CustomerFormBaseCompanySelect
        companies={[
          {
            id: 1,
            name: "Elevare",
          },
          {
            id: 2,
            name: "Verdeo",
          },
          {
            id: 3,
            name: "CodeLoom",
          },
          {
            id: 4,
            name: "TerraNova",
          },
        ]}
      />
    ),
    formAction: fn(),
    id: "new-customer-form",
  },
} satisfies Story;
