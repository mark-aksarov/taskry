import ProjectsTemplate from "./ProjectsTemplate";
import { defaultAppHeaderSlots } from "@/components/layout/AppHeader/defaultAppHeaderSlots";

interface ProjectsTemplateProps {
  children: React.ReactNode;
}

export default async function AppProjectsTemplate({
  children,
}: ProjectsTemplateProps) {
  return (
    <ProjectsTemplate {...defaultAppHeaderSlots}>{children}</ProjectsTemplate>
  );
}
