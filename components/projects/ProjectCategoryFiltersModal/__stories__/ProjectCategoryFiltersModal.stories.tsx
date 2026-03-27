import {
  ProjectCategoryFiltersForm,
  ProjectCategoryFiltersFormSkeleton,
} from "../../ProjectCategoryFiltersForm";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { ProjectCategoryFiltersModal } from "../ProjectCategoryFiltersModal";
import { withProjectFiltersProvider } from "../../ProjectFiltersContext/__stories__";
import { useProjectCategoryFiltersModal } from "../ProjectCategoryFiltersModalContext";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withProjectCategoryFiltersModalProvider } from "./withProjectCategoryFiltersModalProvider";

const meta = {
  title: "components/projects/ProjectCategoryFiltersModal",
  component: ProjectCategoryFiltersModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useProjectCategoryFiltersModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withProjectFiltersProvider,
    withProjectCategoryFiltersModalProvider,
    withSelectedProjectsProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectCategoryFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <ProjectCategoryFiltersForm
        categoryCheckboxGroupItems={mockedProjectCategorySummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <ProjectCategoryFiltersFormSkeleton />,
  },
} satisfies Story;
