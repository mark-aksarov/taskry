import { UserFiltersForm } from "../UserFiltersForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUserFiltersProvider } from "../../UserFiltersContext/__stories__";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";
import { UserFiltersFormPositionCheckboxGroup } from "../../UserFiltersFormPositionCheckboxGroup";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { UserFiltersFormPositionCheckboxGroupStory } from "../../UserFiltersFormPositionCheckboxGroup/__stories__";

const meta: Meta<typeof UserFiltersForm> = {
  title: "components/users/UserFiltersForm",
  component: UserFiltersForm,
  decorators: [
    withPageTransitionProvider,
    withOverlayTriggerStateProvider,
    withUserFiltersProvider,
    withThemedBackground,
  ],
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
