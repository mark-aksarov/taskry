import {
  ProjectDetailAlt,
  ProjectDetailAltSkeleton,
} from "../ProjectDetailAlt";

import {
  ProjectDetailActions,
  ProjectDetailActionsSkeleton,
} from "../ProjectDetailActions";

import { UpdateProjectForm } from "../UpdateProjectForm";
import { UpdateProjectModal } from "../UpdateProjectModal";
import { mockedProjectDetail } from "@/mocks/projects";
import { ProjectDetailCard } from "./ProjectDetailCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { ProjectDetailHeader } from "../ProjectDetailHeader";
import { CommentList } from "@/components/comments/CommentList";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { withUpdateProjectProvider } from "../UpdateProjectProvider/__stories__";
import { withDeleteProjectProvider } from "../DeleteProjectProvider/__stories__";
import { CommentListStory } from "@/components/comments/CommentList/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";

const meta = {
  title: "components/projects/ProjectDetailCard",
  component: ProjectDetailCard,
  decorators: [
    (Story) => (
      <>
        <Story />

        <UpdateProjectModal
          updateProjectFormContainer={
            <UpdateProjectForm
              {...mockedProjectDetail}
              projectId={mockedProjectDetail.id}
              projectCategorySelectItems={mockedProjectCategorySummaries}
              customerSelectItems={mockedCustomerSummaries}
            />
          }
        />
      </>
    ),
    withUpdateProjectProvider,
    withDeleteProjectProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectDetailContainer: <ProjectDetailAlt {...mockedProjectDetail} />,
    projectDetailHeaderContainer: (
      <ProjectDetailHeader
        projectTitle={mockedProjectDetail.title}
        categoryName={mockedProjectDetail.category.name}
      />
    ),
    projectDetailActions: (
      <ProjectDetailActions
        projectId={mockedProjectDetail.id}
        projectTitle={mockedProjectDetail.title}
        sendComment={() => ({ status: "success" })}
        updateComment={() => ({ status: "success" })}
        projectCommentsContainer={<CommentList {...CommentListStory.args} />}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    projectDetailContainer: <ProjectDetailAltSkeleton />,
    projectDetailHeaderContainer: <DetailHeaderSkeleton />,
    projectDetailActions: <ProjectDetailActionsSkeleton />,
  },
} satisfies Story;

export const WithoutOptionalProjectData = {
  args: {
    projectDetailContainer: (
      <ProjectDetailAlt
        id={mockedProjectDetail.id}
        status={mockedProjectDetail.status}
        deadline={mockedProjectDetail.deadline}
      />
    ),
    projectDetailHeaderContainer: (
      <ProjectDetailHeader projectTitle={mockedProjectDetail.title} />
    ),
    projectDetailActions: Default.args.projectDetailActions,
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
