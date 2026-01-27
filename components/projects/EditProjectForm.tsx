import { ProjectFormBase, ProjectFormBaseProps } from "./ProjectFormBase";

export function EditProjectForm(props: Omit<ProjectFormBaseProps, "id">) {
  return <ProjectFormBase id="edit-project-form" {...props} />;
}
