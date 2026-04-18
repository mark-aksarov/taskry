import { mocked } from "storybook/test";
import AppProjectDetailLoading from "./loading";
import AppProjectDetailNotFound from "./not-found";
import { mockedProjectDetail } from "@/mocks/projects";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectDetailAlt } from "@/components/projects/ProjectDetailAlt";
import { ProjectDetailCardHeader } from "@/components/projects/ProjectDetailCard";
import { withTaskSearchModal } from "@/components/tasks/TaskSearchModal/__stories__";
import { withDeleteProjectProvider } from "@/components/projects/DeleteProjectProvider/__stories__";
import { withUpdateProjectTitleProvider } from "@/components/projects/UpdateProjectTitleProvider/__stories__";
import { withUpdateProjectStatusProvider } from "@/components/projects/UpdateProjectStatusProvider/__stories__";
import { withUpdateProjectDeadlineProvider } from "@/components/projects/UpdateProjectDeadlineProvider/__stories__";
import { withUpdateProjectCustomerProvider } from "@/components/projects/UpdateProjectCustomerProvider/__stories__";
import { withUpdateProjectStatusAltProvider } from "@/components/projects/UpdateProjectStatusAltProvider/__stories__";
import { withUpdateProjectDescriptionProvider } from "@/components/projects/UpdateProjectDescriptionProvider/__stories__";
import { withUpdateProjectCategoryRelProvider } from "@/components/projects/UpdateProjectCategoryRelProvider/__stories__";

const meta = {
  title: "pages/ProjectDetailPage",
  component: ProjectDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,
    withUpdateProjectCustomerProvider,
    withUpdateProjectDeadlineProvider,
    withUpdateProjectCategoryRelProvider,
    withUpdateProjectStatusAltProvider,
    withUpdateProjectTitleProvider,
    withUpdateProjectDescriptionProvider,
    withUpdateProjectStatusProvider,
    withDeleteProjectProvider,
    SharedPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/projects/1");
    mocked(useParams).mockReturnValue({
      id: mockedProjectDetail.id.toString(),
    });
  },
} satisfies Meta<typeof ProjectDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectDetailCardHeaderContainer: (
      <ProjectDetailCardHeader
        projectStatus={mockedProjectDetail.status}
        projectDeadline={mockedProjectDetail.deadline}
      />
    ),
    projectDetailContainer: <ProjectDetailAlt {...mockedProjectDetail} />,
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <AppProjectDetailLoading />,
} satisfies Story;

export const WithoutSomeData = {
  args: {
    ...Default.args,
    projectDetailContainer: (
      <ProjectDetailAlt
        title={mockedProjectDetail.title}
        status={mockedProjectDetail.status}
        deadline={mockedProjectDetail.deadline}
        tasks={mockedProjectDetail.tasks}
      />
    ),
  },
} satisfies Story;

export const NotFound = {
  args: { ...Default.args },
  render: () => <AppProjectDetailNotFound />,
} satisfies Story;
