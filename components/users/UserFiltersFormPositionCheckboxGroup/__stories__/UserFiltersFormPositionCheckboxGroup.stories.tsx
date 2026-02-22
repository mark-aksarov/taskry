import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUserFiltersProvider } from "../../UserFiltersContext/__stories__";
import { UserFiltersFormPositionCheckboxGroup } from "../UserFiltersFormPositionCheckboxGroup";

const meta = {
  title: "components/users/UserFiltersFormPositionCheckboxGroup",
  component: UserFiltersFormPositionCheckboxGroup,
  decorators: [withUserFiltersProvider, withThemedBackground],
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
