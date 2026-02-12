import { fn } from "storybook/test";
import { NewProjectForm } from "./NewProjectForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCategorySelect } from "../ProjectCategorySelect";
import { ProjectCustomerSelect } from "../ProjectCustomerSelect";
import { OverlayTriggerStateContext } from "react-aria-components";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as ProjectCategorySelectStory } from "../ProjectCategorySelect/ProjectCategorySelect.stories";
import { Default as ProjectCustomerSelectStory } from "../ProjectCustomerSelect/ProjectCustomerSelect.stories";

const meta = {
  title: "components/projects/NewProjectForm",
  component: NewProjectForm,
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
} satisfies Meta<typeof NewProjectForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectCategorySelect: (
      <ProjectCategorySelect {...ProjectCategorySelectStory.args} />
    ),
    projectCustomerSelect: (
      <ProjectCustomerSelect {...ProjectCustomerSelectStory.args} />
    ),
    createProject: () => ({ status: "success" }),
  },
} satisfies Story;
