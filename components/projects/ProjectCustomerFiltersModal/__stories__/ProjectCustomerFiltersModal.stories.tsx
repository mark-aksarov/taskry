import {
  ProjectCustomerFiltersForm,
  ProjectCustomerFiltersFormSkeleton,
} from "../../ProjectCustomerFiltersForm";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCustomerFiltersModal } from "../ProjectCustomerFiltersModal";
import { withProjectFiltersProvider } from "../../ProjectFiltersContext/__stories__";
import { useProjectCustomerFiltersModal } from "../ProjectCustomerFiltersModalContext";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withProjectCustomerFiltersModalProvider } from "./withProjectCustomerFiltersModalProvider";

const meta = {
  title: "components/projects/ProjectCustomerFiltersModal",
  component: ProjectCustomerFiltersModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useProjectCustomerFiltersModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withProjectFiltersProvider,
    withProjectCustomerFiltersModalProvider,
    withSelectedProjectsProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectCustomerFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <ProjectCustomerFiltersForm
        customerCheckboxGroupItems={mockedCustomerSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <ProjectCustomerFiltersFormSkeleton />,
  },
} satisfies Story;
