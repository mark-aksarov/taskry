import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PositionCheckboxGroup } from "./PositionCheckboxGroup";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta = {
  title: "Components/users/PositionCheckboxGroup",
  component: PositionCheckboxGroup,
  tags: ["autodocs"],
  decorators: [withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof PositionCheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    positions: [
      {
        id: 1,
        name: "Founder",
      },
      {
        id: 2,
        name: "Manager",
      },
      {
        id: 3,
        name: "Designer",
      },
      {
        id: 4,
        name: "Developer",
      },
    ],
  },
} satisfies Story;
