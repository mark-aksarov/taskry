import {
  ProjectDetailAlt,
  ProjectDetailAltSkeleton,
} from "@/components/projects/ProjectDetailAlt";

import { mocked } from "storybook/test";
import { mockedProjectDetail } from "@/mocks/projects";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { SearchList } from "@/components/search/SearchList";
import { CommentList } from "@/components/comments/CommentList";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { UpdateProjectForm } from "@/components/projects/UpdateProjectForm";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { ProjectDetailHeader } from "@/components/projects/ProjectDetailHeader";
import { CommentListStory } from "@/components/comments/CommentList/__stories__";
import { withProjectProviders } from "@/components/projects/ProjectProviders/__stories__";

const meta = {
  title: "pages/ProjectDetailPage",
  component: ProjectDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [withProjectProviders, SharedPageDecorator, withThemedBackground],
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
    projectId: mockedProjectDetail.id,
    projectTitle: mockedProjectDetail.title,
    sendComment: () => ({ status: "success" }),
    updateComment: () => ({ status: "success" }),
    searchContainer: <SearchList {...SearchListStory.args} />,
    projectCommentsContainer: <CommentList {...CommentListStory.args} />,
    projectDetailContainer: <ProjectDetailAlt {...mockedProjectDetail} />,
    projectHeaderContainer: (
      <ProjectDetailHeader
        projectTitle={mockedProjectDetail.title}
        categoryName={mockedProjectDetail.category.name}
      />
    ),
    updateProjectFormContainer: (
      <UpdateProjectForm
        {...mockedProjectDetail}
        projectId={mockedProjectDetail.id}
        projectCategorySelectItems={mockedProjectCategorySummaries}
        customerSelectItems={mockedCustomerSummaries}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    projectDetailContainer: <ProjectDetailAltSkeleton />,
    projectHeaderContainer: <DetailHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    ...Default.args,
    projectDetailContainer: (
      <ProjectDetailAlt
        id={mockedProjectDetail.id}
        status={mockedProjectDetail.status}
        deadline={mockedProjectDetail.deadline}
      />
    ),
    projectHeaderContainer: (
      <ProjectDetailHeader projectTitle={mockedProjectDetail.title} />
    ),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
