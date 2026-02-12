import { fn } from "storybook/test";
import { NewCompanyForm } from "./NewCompanyForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OverlayTriggerStateContext } from "react-aria-components";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/companies/NewCompanyForm",
  component: NewCompanyForm,
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
} satisfies Meta<typeof NewCompanyForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createCompany: () => ({ status: "success" }),
  },
} satisfies Story;
