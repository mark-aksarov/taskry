import {
  ProjectDetailAlt,
  ProjectDetailAltSkeleton,
} from "@/components/projects/ProjectDetailAlt";

import { mocked } from "storybook/test";
import { mockedProjectDetail } from "@/mocks/projects";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { EditProjectForm } from "@/components/projects/EditProjectForm";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { getCommentList } from "@/components/comments/CommentList/__stories__";
import { ProjectDetailHeader } from "@/components/projects/ProjectDetailHeader";
import { editProjectFormArgs } from "@/components/projects/EditProjectForm/__stories__";

const meta = {
  title: "pages/ProjectDetailPage",
  component: ProjectDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/projects/1");
    mocked(useParams).mockReturnValue({
      id: "1",
    });
  },
} satisfies Meta<typeof ProjectDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const project = mockedProjectDetail;

export const Default = {
  args: {
    projectId: project.id,
    projectTitle: project.title,
    sendComment: () => ({ status: "success" }),
    updateComment: () => ({ status: "success" }),
    projectCommentsContainer: getCommentList(),
    projectDetailContainer: <ProjectDetailAlt {...project} />,
    projectHeaderContainer: (
      <ProjectDetailHeader
        projectTitle={project.title}
        categoryName={project.category.name}
      />
    ),
    editProjectFormContainer: <EditProjectForm {...editProjectFormArgs} />,
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
        id={project.id}
        status={project.status}
        deadline={project.deadline}
      />
    ),
    projectHeaderContainer: (
      <ProjectDetailHeader projectTitle={project.title} />
    ),
  },
} satisfies Story;
