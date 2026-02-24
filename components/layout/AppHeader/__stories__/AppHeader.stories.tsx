import {
  TasksSearchPresentationStory,
  ProjectsSearchPresentationStory,
} from "@/components/search/SearchPresentation/__stories__";

import { mocked } from "storybook/test";
import { AppHeader } from "../AppHeader";
import { ProfileLink } from "../../ProfileLink";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SearchPresentation } from "@/components/search/SearchPresentation";

const meta = {
  title: "components/layout/AppHeader",
  component: AppHeader,
  decorators: [withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/");
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    heading: "Dashboard",
    tasksSearchContainer: (
      <SearchPresentation {...TasksSearchPresentationStory.args} />
    ),
    projectsSearchContainer: (
      <SearchPresentation {...ProjectsSearchPresentationStory.args} />
    ),
    profileLinkContainer: <ProfileLink fullName="User 1" imageUrl="/man.jpg" />,
  },
} satisfies Story;
