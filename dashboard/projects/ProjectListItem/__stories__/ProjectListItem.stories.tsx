import { subDays } from "date-fns";
import { ProjectListItem } from "../ProjectListItem";
import { mockedProjectList } from "@/mocks/projects";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
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
  title: "dashboard/projects/ProjectListItem",
  component: ProjectListItem,
  render: (args) => (
    <DeadlineProvider deadline={args.deadline} status={args.status}>
      <ProjectListItem {...args} />
    </DeadlineProvider>
  ),
  decorators: [
    (Story) => (
      <SelectedProjectsProvider pageItems={[]}>
        <ViewModeProvider initialValue="list">
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
} satisfies Meta<typeof ProjectListItem>;

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
    client: {
      ...Default.args.client,
      fullName:
        "This is a client name with a very long text for layout testing",
    },
    category: {
      ...Default.args.category,
      name: "This is a category name with a very long text for layout testing",
    },
    company: {
      ...Default.args.company,
      name: "This is a company name with a very long text for layout testing",
    },
  },
} satisfies Story;

export const WithActiveStatus = {
  args: {
    ...Default.args,
    status: "active",
  },
} satisfies Story;

export const WithCompletedStatus = {
  args: {
    ...Default.args,
    status: "completed",
  },
} satisfies Story;
