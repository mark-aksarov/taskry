import { Meta, StoryObj } from "@storybook/react";
import { CompanyListItem } from "./CompanyListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CompanyItemActionMenuTrigger } from "../CompanyItemActionMenuTrigger";

const meta = {
  title: "components/companies/CompanyListItem",
  component: CompanyListItem,
  decorators: [withThemedBackground],
} satisfies Meta<typeof CompanyListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    name: "TechNova Solutions Inc.",
    menuTrigger: (
      <CompanyItemActionMenuTrigger
        guestMode={false}
        companyId={1}
        companyName="TechNova Solutions Inc."
      />
    ),
  },
} satisfies Story;
