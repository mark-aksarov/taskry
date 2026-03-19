import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { mockedUserSummaries } from "@/mocks/users";
import { DialogTrigger } from "react-aria-components";
import { AssigneeFiltersForm } from "../AssigneeFiltersForm";
import { AssigneeFiltersModal } from "./AssigneeFiltersModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskFiltersProvider } from "../TaskFiltersContext/__stories__";
import { withSelectedTasksProvider } from "../SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/tasks/AssigneeFiltersModal",
  component: AssigneeFiltersModal,
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
    withTaskFiltersProvider,
    withSelectedTasksProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof AssigneeFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <AssigneeFiltersForm assigneeCheckboxGroupItems={mockedUserSummaries} />
    ),
  },
} satisfies Story;
