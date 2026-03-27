import {
  ProjectFiltersForm,
  ProjectFiltersFormSkeleton,
} from "../../ProjectFiltersForm";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { mockedUserSummaries } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { ProjectFiltersModal } from "../ProjectFiltersModal";
import { useProjectFiltersModal } from "../ProjectFiltersModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { withProjectFiltersModalProvider } from "./withProjectFiltersModalProvider";
import { withProjectFiltersProvider } from "../../ProjectFiltersContext/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/projects/ProjectFiltersModal",
  component: ProjectFiltersModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useProjectFiltersModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withProjectFiltersModalProvider,
    withProjectFiltersProvider,
    withSelectedProjectsProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectFiltersModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <ProjectFiltersForm
        categoryCheckboxGroupItems={mockedProjectCategorySummaries}
        userCheckboxGroupItems={mockedUserSummaries}
        customerCheckboxGroupItems={mockedCustomerSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <ProjectFiltersFormSkeleton />,
  },
} satisfies Story;
