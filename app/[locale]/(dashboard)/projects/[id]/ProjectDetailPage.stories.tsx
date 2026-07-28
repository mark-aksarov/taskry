import { mocked } from "storybook/test";
import AppProjectDetailLoading from "./loading";
import AppProjectDetailNotFound from "./not-found";
import { mockedProjectDetail } from "@/mocks/projects";
import { mockedClientSummaries } from "@/mocks/clients";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { withDashboardLayout } from "@/.storybook/withDashboardLayout";
import { ProjectDetailAlt } from "@/dashboard/projects/ProjectDetailAlt";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { SearchListExample } from "@/dashboard/search/SearchList/__stories__";
import { ProjectDetailCardHeader } from "@/dashboard/projects/ProjectDetailCard";
import { UpdateProjectClientForm } from "@/dashboard/projects/UpdateProjectClientForm";
import { UpdateProjectCategoryRelForm } from "@/dashboard/projects/UpdateProjectCategoryRelForm";

const meta = {
  title: "pages/ProjectDetailPage",
  component: ProjectDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [withDashboardLayout],
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
    project: mockedProjectDetail,
    projectDetailCardHeaderContainer: (
      <ProjectDetailCardHeader
        projectStatus={mockedProjectDetail.status}
        projectDeadline={mockedProjectDetail.deadline}
      />
    ),
    projectDetailContainer: <ProjectDetailAlt {...mockedProjectDetail} />,
    updateProjectCategoryRelFormContainer: (
      <UpdateProjectCategoryRelForm
        projectId={mockedProjectDetail.id}
        categoryId={mockedProjectDetail.category.id}
        projectCategorySelectItems={mockedProjectCategorySummaries}
      />
    ),
    updateProjectClientFormContainer: (
      <UpdateProjectClientForm
        projectId={mockedProjectDetail.id}
        clientId={mockedProjectDetail.client.id}
        clientSelectItems={mockedClientSummaries}
      />
    ),
    searchContainer: <SearchListExample />,
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
