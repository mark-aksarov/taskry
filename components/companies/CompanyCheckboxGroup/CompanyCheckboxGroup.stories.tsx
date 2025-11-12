import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { CompanyCheckboxGroup } from "./CompanyCheckboxGroup";

const meta = {
  title: "Components/projects/CompanyCheckboxGroup",
  component: CompanyCheckboxGroup,
  decorators: [withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof CompanyCheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    companies: [
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
    ],
  },
} satisfies Story;
