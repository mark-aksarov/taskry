import { CustomerGrid } from "./CustomerGrid";
import { customersMock } from "../customersMock";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ViewModeProvider } from "@/components/common/ViewMode";

const meta = {
  title: "Components/customers/CustomerGrid",
  component: CustomerGrid,
  tags: ["autodocs"],
  args: {
    customers: customersMock,
  },
  decorators: [
    (Story) => (
      <ViewModeProvider initialValue="grid">
        <Story />
      </ViewModeProvider>
    ),
  ],
} satisfies Meta<typeof CustomerGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnMobile: Story = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
};
