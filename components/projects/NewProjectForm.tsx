import { ProjectFormBase, ProjectFormBaseProps } from "./ProjectFormBase";

export function NewProjectForm(props: Omit<ProjectFormBaseProps, "id">) {
  return <ProjectFormBase id="new-project-form" {...props} />;
}
