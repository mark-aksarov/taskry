import ProjectCategoriesTemplate from "./ProjectCategoriesTemplate";
import { defaultAppHeaderSlots } from "@/components/layout/AppHeader/defaultAppHeaderSlots";

interface ProjectCategoriesTemplateProps {
  children: React.ReactNode;
}

export default async function AppProjectCategoriesTemplate({
  children,
}: ProjectCategoriesTemplateProps) {
  return (
    <ProjectCategoriesTemplate {...defaultAppHeaderSlots}>
      {children}
    </ProjectCategoriesTemplate>
  );
}
