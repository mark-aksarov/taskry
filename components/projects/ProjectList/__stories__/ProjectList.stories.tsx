import { ProjectList } from "../ProjectList";
import { mockedProjectList } from "@/mocks/projects";
import { ProjectListItem } from "../../ProjectListItem";
import type { Meta, StoryObj } from "@storybook/react";
import { ProjectListItemStory } from "../../ProjectListItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteProjectModalProvider } from "../../DeleteProjectModal/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withUpdateProjectStatusesProvider } from "../../UpdateProjectStatusContext/__stories__";
import { withDeleteCommentModalProvider } from "@/components/comments/DeleteCommentModal/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/projects/ProjectList",
  component: ProjectList,
  decorators: [
    withPageTransitionProvider,
    withSelectedProjectsProvider,
    withDeleteCommentModalProvider,
    withUpdateProjectStatusesProvider,
    withDeleteProjectModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectList & { showCheckbox?: boolean }>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    showCheckbox: true,
    children: mockedProjectList.map((project) => (
      <ProjectListItem
        key={project.id}
        {...ProjectListItemStory.args}
        {...project}
        showCheckbox={true}
      />
    )),
  },
} satisfies Story;
