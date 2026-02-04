import { fn } from "storybook/test";
import { EditProjectForm } from "./EditProjectForm";
import { parseDate } from "@internationalized/date";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ProjectCategorySelect } from "../ProjectCategorySelect";
import { ProjectCustomerSelect } from "../ProjectCustomerSelect";
import { OverlayTriggerStateContext } from "react-aria-components";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as ProjectCategorySelectStory } from "../ProjectCategorySelect/ProjectCategorySelect.stories";
import { Default as ProjectCustomerSelectStory } from "../ProjectCustomerSelect/ProjectCustomerSelect.stories";

const meta = {
  title: "components/projects/EditProjectForm",
  component: EditProjectForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <OverlayTriggerStateContext.Provider value={{ close: fn() } as any}>
        <div className="max-w-[500px]">
          <Story />
        </div>
      </OverlayTriggerStateContext.Provider>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof EditProjectForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectId: 1,
    projectTitleDefaultValue: "Website Redesign",
    projectDescriptionDefaultValue:
      "A complete redesign of the client’s website with improved UX, SEO, and performance.",
    projectDeadlineDefaultValue: parseDate("2025-12-01"),
    projectStatusDefaultValue: ProjectStatus.pending,
    projectCategorySelect: (
      <ProjectCategorySelect {...ProjectCategorySelectStory.args} />
    ),
    projectCustomerSelect: (
      <ProjectCustomerSelect {...ProjectCustomerSelectStory.args} />
    ),
    updateProject: () => ({ status: "success" }),
  },
} satisfies Story;
