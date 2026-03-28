import {
  ProjectDetailAlt,
  ProjectDetailAltSkeleton,
} from "@/components/projects/ProjectDetailAlt";

import { mocked } from "storybook/test";
import { mockedProjectDetail } from "@/mocks/projects";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectDetailHeader } from "@/components/projects/ProjectDetailHeader";
import { withTaskSearchModal } from "@/components/tasks/TaskSearchModal/__stories__";
import { withDeleteProjectProvider } from "@/components/projects/DeleteProjectProvider/__stories__";
import { withUpdateProjectProvider } from "@/components/projects/UpdateProjectProvider/__stories__";
import { withUpdateProjectStatusProvider } from "@/components/projects/UpdateProjectStatusProvider/__stories__";

const meta = {
  title: "pages/ProjectDetailPage",
  component: ProjectDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,
    withUpdateProjectStatusProvider,
    withDeleteProjectProvider,
    withUpdateProjectProvider,
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
    projectDetailContainer: <ProjectDetailAlt {...mockedProjectDetail} />,
    projectHeaderContainer: (
      <ProjectDetailHeader
        projectTitle={mockedProjectDetail.title}
        categoryName={mockedProjectDetail.category.name}
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
