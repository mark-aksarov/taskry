import { Meta, StoryObj } from "@storybook/react";
import { ProjectCategoryListItem } from "../ProjectCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withProjectCategoryProviders } from "../../ProjectCategoryProviders/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withDeleteProjectCategoriesProvider } from "../../DeleteProjectCategoriesProvider/__stories__";

const meta = {
  title: "components/project-categories/ProjectCategoryListItem",
  component: ProjectCategoryListItem,
  decorators: [
    withProjectCategoryProviders,
    withDeleteProjectCategoriesProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectCategoryListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    name: "Project Category 1",
    updateProjectCategory: () => ({ status: "success" }),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
