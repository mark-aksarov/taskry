import {
  ProjectDetailAlt,
  ProjectDetailAltSkeleton,
} from "../ProjectDetailAlt";

import {
  ProjectDetailCardHeader,
  ProjectDetailCardHeaderSkeleton,
} from "./ProjectDetailCardHeader";

import { subDays } from "date-fns";
import { mockedProjectDetail } from "@/mocks/projects";
import { ProjectDetailCard } from "./ProjectDetailCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteProjectProvider } from "../DeleteProjectContext";
import { DeadlineProvider } from "@/dashboard/common/DeadlineContext";
import { UpdateProjectTitleProvider } from "../UpdateProjectTitleContext";
import { UpdateProjectClientProvider } from "../UpdateProjectClientContext";
import { UpdateProjectStatusProvider } from "../UpdateProjectStatusContext";
import { UpdateProjectDeadlineProvider } from "../UpdateProjectDeadlineContext";
import { UpdateProjectStatusAltProvider } from "../UpdateProjectStatusAltContext";
import { UpdateProjectCategoryRelProvider } from "../UpdateProjectCategoryRelContext";
import { UpdateProjectDescriptionProvider } from "../UpdateProjectDescriptionContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

type PropsAndDeadlineArgs = React.ComponentProps<typeof ProjectDetailCard> & {
  deadline: string;
};

const meta = {
  title: "dashboard/projects/ProjectDetailCard",
  component: ProjectDetailCard,
  render: (args) => (
    <DeadlineProvider
      deadline={args.deadline}
      status={mockedProjectDetail.status}
    >
      <ProjectDetailCard {...args} />
    </DeadlineProvider>
  ),
  decorators: [
    (Story) => (
      <UpdateProjectStatusProvider>
        <UpdateProjectDescriptionProvider>
          <UpdateProjectTitleProvider>
            <UpdateProjectStatusAltProvider>
              <UpdateProjectCategoryRelProvider>
                <UpdateProjectDeadlineProvider>
                  <UpdateProjectClientProvider>
                    <DeleteProjectProvider>
                      <Story />
                    </DeleteProjectProvider>
                  </UpdateProjectClientProvider>
                </UpdateProjectDeadlineProvider>
              </UpdateProjectCategoryRelProvider>
            </UpdateProjectStatusAltProvider>
          </UpdateProjectTitleProvider>
        </UpdateProjectDescriptionProvider>
      </UpdateProjectStatusProvider>
    ),
    withDashboardLayoutProviders,
  ],
} satisfies Meta<PropsAndDeadlineArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectDetailCardHeaderContainer: (
      <ProjectDetailCardHeader projectStatus={mockedProjectDetail.status} />
    ),
    projectDetailContainer: <ProjectDetailAlt {...mockedProjectDetail} />,
    deadline: mockedProjectDetail.deadline,
  },
} satisfies Story;

export const WithOverdueDeadline = {
  args: {
    ...Default.args,
    projectDetailContainer: <ProjectDetailAlt {...mockedProjectDetail} />,
    deadline: subDays(new Date(), 3).toISOString(),
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    projectDetailCardHeaderContainer: <ProjectDetailCardHeaderSkeleton />,
    projectDetailContainer: <ProjectDetailAltSkeleton />,
    deadline: mockedProjectDetail.deadline,
  },
} satisfies Story;

export const WithoutOptionalProjectData = {
  args: {
    ...Default.args,
    projectDetailContainer: (
      <ProjectDetailAlt
        title={mockedProjectDetail.title}
        status={mockedProjectDetail.status}
        tasks={{
          total: 0,
          active: 0,
          pending: 0,
          completed: 0,
        }}
      />
    ),
  },
} satisfies Story;
