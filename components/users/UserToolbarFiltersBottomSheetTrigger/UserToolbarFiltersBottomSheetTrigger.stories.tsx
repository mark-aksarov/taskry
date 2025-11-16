import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserFiltersForm, UserFiltersFormSkeleton } from "../UserFiltersForm";
import { UserToolbarFiltersBottomSheetTrigger } from "./UserToolbarFiltersBottomSheetTrigger";
import { Default as UserFiltersFormStory } from "../UserFiltersForm/UserFiltersForm.stories";

const meta = {
  title: "Components/users/UserToolbarFiltersBottomSheetTrigger",
  component: UserToolbarFiltersBottomSheetTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  globals: {
    viewport: "mobile2",
  },
} satisfies Meta<typeof UserToolbarFiltersBottomSheetTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filtersForm: <UserFiltersForm {...UserFiltersFormStory.args} />,
  },
};

export const Skeleton: Story = {
  args: {
    filtersForm: <UserFiltersFormSkeleton />,
  },
};
