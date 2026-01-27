import {
  ProjectCategoryFormBase,
  ProjectCategoryFormBaseProps,
} from "./ProjectCategoryFormBase";

export function NewProjectCategoryForm(
  props: Omit<ProjectCategoryFormBaseProps, "id">,
) {
  return <ProjectCategoryFormBase id="new-project-category-form" {...props} />;
}
