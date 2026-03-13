import { ProjectDetail } from "../../ProjectDetail";
import { ProjectGridItem } from "../ProjectGridItem";
import { mockedProjectList } from "@/mocks/projects";
import type { Meta, StoryObj } from "@storybook/react";
import { EditProjectForm } from "../../EditProjectForm";
import { ProjectStatus } from "@/generated/prisma/enums";
import { UserDetail } from "@/components/users/UserDetail";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { mockedUserDetail as mockedUser } from "@/mocks/users";
import { CommentList } from "@/components/comments/CommentList";
import { UserDetailHeader } from "@/components/users/UserDetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withProjectItemProviders } from "../../ProjectItem/__stories__";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { CommentListStory } from "@/components/comments/CommentList/__stories__";
import { withDeleteProjectsProvider } from "../../DeleteProjectsContext/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withUpdateProjectStatusesProvider } from "../../UpdateProjectStatusesContext/__stories__";

const meta = {
  title: "components/projects/ProjectGridItem",
  component: ProjectGridItem,
  decorators: [
    withProjectItemProviders,
    withDeleteProjectsProvider,
    withUpdateProjectStatusesProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withSelectedProjectsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectGridItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockedProject = mockedProjectList[0];

export const Default = {
  args: {
    ...mockedProject,
    projectCommentsContainer: <CommentList {...CommentListStory.args} />,
    editProjectFormContainer: (
      <EditProjectForm
        {...mockedProject}
        projectId={mockedProject.id}
        projectCategorySelectItems={mockedProjectCategorySummaries}
        projectCustomerSelectItems={mockedCustomerSummaries}
      />
    ),
    projectDetailContainer: <ProjectDetail {...mockedProject} />,
    userDetailContainer: <UserDetail {...mockedUser} />,
    userDetailHeaderContainer: (
      <UserDetailHeader
        userId={mockedUser.id}
        fullName={mockedUser.fullName}
        positionName={mockedUser.position.name}
        imageUrl={mockedUser.imageUrl}
        createPresignedUrl={() => ({ status: "success" })}
        updateUserImageUrl={() => ({ status: "success" })}
        canUpdateImage
      />
    ),
    sendComment: () => ({ status: "success" }),
    updateComment: () => ({ status: "success" }),
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

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
