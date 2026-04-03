import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectItemBaseBadge } from "./ProjectItemBaseBadge";
import { withSelectedProjectsProvider } from "../SelectedProjectsContext/__stories__";
import { withUpdateProjectStatusProvider } from "../UpdateProjectStatusProvider/__stories__";
import { withUpdateProjectStatusesProvider } from "../UpdateProjectStatusesProvider/__stories__";

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
