import { UserFiltersForm } from "../UserFiltersForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserFiltersFormPositionCheckboxGroup } from "../../UserFiltersFormPositionCheckboxGroup";
import { UserFiltersFormPositionCheckboxGroupStory } from "../../UserFiltersFormPositionCheckboxGroup/__stories__";

const meta: Meta<typeof UserFiltersForm> = {
  title: "components/users/UserFiltersForm",
  component: UserFiltersForm,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof UserFiltersForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    positionCheckboxGroup: (
      <UserFiltersFormPositionCheckboxGroup
        {...UserFiltersFormPositionCheckboxGroupStory.args}
      />
    ),
  },
} satisfies Story;
