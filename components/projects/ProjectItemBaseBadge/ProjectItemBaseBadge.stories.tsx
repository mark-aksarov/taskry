import { Meta, StoryObj } from "@storybook/react";
import { ProjectItemBaseBadge } from "./ProjectItemBaseBadge";
import { withSelectedProjectsProvider } from "../SelectedProjectsContext/__stories__";
import { withUpdateProjectStatusProvider } from "../UpdateProjectStatusContext/__stories__";
import { withUpdateProjectStatusesProvider } from "../UpdateProjectStatusesContext/__stories__";

const meta: Meta<typeof ProjectItemBaseBadge> = {
  title: "components/projects/ProjectItemBaseBadge",
  component: ProjectItemBaseBadge,
  decorators: [
    withUpdateProjectStatusProvider,
    withUpdateProjectStatusesProvider,
    withSelectedProjectsProvider,
  ],
} satisfies Meta<typeof ProjectItemBaseBadge>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Pending = {
  args: {
    status: "pending",
  },
} satisfies Story;

export const Active = {
  args: {
    status: "active",
  },
} satisfies Story;

export const Done = {
  args: {
    status: "completed",
  },
} satisfies Story;
