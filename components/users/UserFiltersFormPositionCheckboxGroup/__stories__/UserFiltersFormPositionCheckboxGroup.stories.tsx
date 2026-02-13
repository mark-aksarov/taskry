import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserFiltersFormPositionCheckboxGroup } from "../UserFiltersFormPositionCheckboxGroup";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/UserFiltersFormPositionCheckboxGroup",
  component: UserFiltersFormPositionCheckboxGroup,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof UserFiltersFormPositionCheckboxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    positions: [
      {
        id: 1,
        name: "Position 1",
      },
      {
        id: 2,
        name: "Position 2",
      },
      {
        id: 3,
        name: "Position 3",
      },
      {
        id: 4,
        name: "Position 4",
      },
    ],
  },
};
