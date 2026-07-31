import { subDays } from "date-fns";
import { mockedProjectList } from "@/mocks/projects";
import { ProjectStatus } from "@/generated/prisma/enums";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { ProjectGridItemMobile } from "../ProjectGridItemMobile";
import { UpdateProjectProvider } from "../../UpdateProjectContext";
import { DeleteProjectProvider } from "../../DeleteProjectContext";
import { DeleteProjectsProvider } from "../../DeleteProjectsContext";
import { DeadlineProvider } from "@/dashboard/common/DeadlineContext";
import { SelectedProjectsProvider } from "../../SelectedProjectsContext";
import { UpdateProjectStatusProvider } from "../../UpdateProjectStatusContext";
import { UpdateProjectStatusesProvider } from "../../UpdateProjectStatusesContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const mockedProject = mockedProjectList[0];

const meta = {
  title: "dashboard/projects/ProjectGridItemMobile",
  component: ProjectGridItemMobile,
  render: (args) => (
    <DeadlineProvider deadline={args.deadline}>
      <ProjectGridItemMobile {...args} />
    </DeadlineProvider>
  ),
  decorators: [
    (Story) => (
      <SelectedProjectsProvider pageItems={[]}>
        <ViewModeProvider initialValue="grid">
          <DeleteProjectsProvider>
            <DeleteProjectProvider>
              <UpdateProjectProvider>
                <UpdateProjectStatusProvider>
                  <UpdateProjectStatusesProvider>
                    <Story />
                  </UpdateProjectStatusesProvider>
                </UpdateProjectStatusProvider>
              </UpdateProjectProvider>
            </DeleteProjectProvider>
          </DeleteProjectsProvider>
        </ViewModeProvider>
      </SelectedProjectsProvider>
    ),
    withDashboardLayoutProviders,
  ],
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof ProjectGridItemMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedProject,
  },
} satisfies Story;

export const WithOverdueDeadline = {
  args: {
    ...mockedProject,
    deadline: subDays(new Date(), 3).toISOString(),
  },
} satisfies Story;

export const WithOverflowContent = {
  args: {
    ...Default.args,
    title: "This is a project title with a very long text for layout testing",
    creator: {
      ...Default.args.creator,
      fullName: "This is a user name with a very long text for layout testing",
    },
  },
} satisfies Story;

export const WithoutCreator = {
  args: {
    ...Default.args,
    creator: undefined,
  },
} satisfies Story;

export const WithoutCreatorImage = {
  args: {
    ...Default.args,
    creator: {
      id: "user1",
      fullName: "Alice Smith",
      imageUrl: undefined,
    },
  },
} satisfies Story;

export const WithActiveStatus = {
  args: {
    ...Default.args,
    status: ProjectStatus.active,
  },
} satisfies Story;

export const WithCompletedStatus = {
  args: {
    ...Default.args,
    status: ProjectStatus.completed,
  },
} satisfies Story;
