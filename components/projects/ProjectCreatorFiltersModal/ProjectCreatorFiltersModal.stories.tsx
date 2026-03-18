import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { mockedUserSummaries } from "@/mocks/users";
import { DialogTrigger } from "react-aria-components";
import { ProjectCreatorFiltersForm } from "../ProjectCreatorFiltersForm";
import { ProjectCreatorFiltersModal } from "./ProjectCreatorFiltersModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withProjectFiltersProvider } from "../ProjectFiltersContext/__stories__";
import { withSelectedProjectsProvider } from "../SelectedProjectsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/projects/ProjectCreatorFiltersModal",
  component: ProjectCreatorFiltersModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="Open modal" />
          <Story />
        </DialogTrigger>
      );
    },
    withProjectFiltersProvider,
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
