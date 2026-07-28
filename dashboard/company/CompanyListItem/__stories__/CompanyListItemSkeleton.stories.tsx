import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompanyListItemSkeleton } from "../CompanyListItemSkeleton";

const meta = {
  title: "dashboard/companies/CompanyListItemSkeleton",
  component: CompanyListItemSkeleton,
} satisfies Meta<typeof CompanyListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
