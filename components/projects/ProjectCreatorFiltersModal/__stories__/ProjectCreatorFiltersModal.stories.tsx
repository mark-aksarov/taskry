import {
  ProjectCreatorFiltersForm,
  ProjectCreatorFiltersFormSkeleton,
} from "../../ProjectCreatorFiltersForm";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

import { ProjectCreatorFiltersModal } from "../ProjectCreatorFiltersModal";
import { withProjectFiltersProvider } from "../../ProjectFiltersContext/__stories__";
import { useProjectCreatorFiltersModal } from "../ProjectCreatorFiltersModalContext";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withProjectCreatorFiltersModalProvider } from "./withProjectCreatorFiltersModalProvider";
import { mockedUserSummaries } from "@/mocks/users";

const meta = {
  title: "components/projects/ProjectCreatorFiltersModal",
  component: ProjectCreatorFiltersModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useProjectCreatorFiltersModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withProjectFiltersProvider,
    withProjectCreatorFiltersModalProvider,
    withSelectedProjectsProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectCreatorFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <ProjectCreatorFiltersForm
        creatorCheckboxGroupItems={mockedUserSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <ProjectCreatorFiltersFormSkeleton />,
  },
} satisfies Story;
