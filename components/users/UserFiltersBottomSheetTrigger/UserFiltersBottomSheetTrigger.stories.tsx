import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserFiltersForm, UserFiltersFormSkeleton } from "../UserFiltersForm";
import { UserFiltersBottomSheetTrigger } from "./UserFiltersBottomSheetTrigger";
import { Default as UserFiltersFormStory } from "../UserFiltersForm/UserFiltersForm.stories";

const meta = {
  title: "Components/users/UserFiltersBottomSheetTrigger",
  component: UserFiltersBottomSheetTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  globals: {
    viewport: "mobile2",
  },
} satisfies Meta<typeof UserFiltersBottomSheetTrigger>;

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
