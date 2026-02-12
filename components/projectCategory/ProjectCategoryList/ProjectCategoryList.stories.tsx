import { Meta, StoryObj } from "@storybook/react";
import { ProjectCategoryList } from "./ProjectCategoryList";
import { ProjectCategoryListItem } from "../ProjectCategoryListItem";
import { EditProjectCategoryForm } from "../EditProjectCategoryForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCategoryItemActionMenuTrigger } from "../ProjectCategoryItemActionMenuTrigger";

const mockedProjectCategories = [
  { id: 6, name: "Web Development" },
  { id: 7, name: "Mobile Applications" },
  { id: 8, name: "Marketing" },
  { id: 9, name: "Design" },
  { id: 10, name: "Internal Systems" },
];

const meta = {
  title: "components/project-categories/ProjectCategoryList",
  component: ProjectCategoryList,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectCategoryList>;

export default meta;
type Story = StoryObj<typeof ProjectCategoryList>;

export const Default = {
  args: {
    children: mockedProjectCategories.map((projectCategory) => (
      <ProjectCategoryListItem
        key={projectCategory.id}
        id={projectCategory.id}
        name={projectCategory.name}
        menuTrigger={
          <ProjectCategoryItemActionMenuTrigger
            guestMode={false}
            projectId={projectCategory.id}
            projectCategoryName={projectCategory.name}
            editProjectCategoryForm={
              <EditProjectCategoryForm
                projectCategoryId={projectCategory.id}
                nameDefaultValue={projectCategory.name}
                updateProjectCategory={() => ({ status: "success" })}
              />
            }
          />
        }
      />
    )),
  },
} satisfies Story;
