import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserFiltersForm } from "./UserFiltersForm";
import { PositionCheckboxGroup } from "../PositionCheckboxGroup";
import { Default as PositionCheckboxGroupStory } from "@/components/users/PositionCheckboxGroup/PositionCheckboxGroup.stories";
import {
  withContainerWidth,
  withBackgroundVariant,
} from "@/.storybook/decorators";

const meta: Meta<typeof UserFiltersForm> = {
  title: "Components/users/UserFiltersForm",
  component: UserFiltersForm,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof UserFiltersForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    positionCheckboxGroup: (
      <PositionCheckboxGroup {...PositionCheckboxGroupStory.args} />
    ),
  },
} satisfies Story;
