import { use } from "react";
import { Project } from "@/generated/prisma";
import { CheckboxGroup, Checkbox } from "@/components/ui";

export function ProjectCheckboxGroup({
  projectsPromise,
}: {
  projectsPromise: Promise<Project[]>;
}) {
  const projects = use(projectsPromise);

  if (!projects.length) {
    return null;
  }

  return (
    <CheckboxGroup label="Project">
      {projects.map((item) => (
        <Checkbox
          key={item.id}
          value={item.id.toString()}
          className="font-normal capitalize"
        >
          {item.title}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
