import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompanyListItemSkeleton } from "../CompanyListItemSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/companies/CompanyListItemSkeleton",
  component: CompanyListItemSkeleton,
  decorators: [withThemedBackground],
} satisfies Meta<typeof CompanyListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
