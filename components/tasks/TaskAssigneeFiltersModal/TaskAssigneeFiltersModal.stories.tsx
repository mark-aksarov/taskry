import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DialogTrigger } from "react-aria-components";
import { TaskAssigneeFiltersForm } from "../TaskAssigneeFiltersForm";
import { TaskAssigneeFiltersModal } from "./TaskAssigneeFiltersModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskFiltersProvider } from "../TaskFiltersContext/__stories__";
import { withSelectedTasksProvider } from "../SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { mockedUserSummaries } from "@/mocks/users";

const meta = {
  title: "components/tasks/TaskAssigneeFiltersModal",
  component: TaskAssigneeFiltersModal,
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
} satisfies Meta<typeof TaskAssigneeFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <TaskAssigneeFiltersForm
        assigneeCheckboxGroupItems={mockedUserSummaries}
      />
    ),
  },
} satisfies Story;
