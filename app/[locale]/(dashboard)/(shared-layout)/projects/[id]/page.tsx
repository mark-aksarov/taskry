import { notFound } from "next/navigation";
import { projectId } from "@/lib/schemas/project";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { getProjectSummary } from "@/lib/data/project/project.dal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { ProjectDetailModals } from "@/components/projects/ProjectDetailModals";
import { ProjectDetailProviders } from "@/components/projects/ProjectDetailProviders";
import { ProjectDetailAltContainer } from "@/components/projects/ProjectDetailAltContainer";
import { ProjectDetailHeaderContainer } from "@/components/projects/ProjectDetailHeaderContainer";

export default async function AppProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();

  // Validation
  const { id: rawProjectId } = await params;

  const parsed = projectId.safeParse(rawProjectId);
  if (!parsed.success) {
    notFound();
  }
  const id = parsed.data;

  // Get project summary
  const projectSummary = await getProjectSummary(id);

  if (!projectSummary) {
    notFound();
  }

  return (
    <ProjectDetailProviders>
      <ProjectDetailPage
        searchContainer={<LinkSearchContainer pathname="/tasks" />}
        projectDetailContainer={<ProjectDetailAltContainer projectId={id} />}
        projectHeaderContainer={<ProjectDetailHeaderContainer projectId={id} />}
      />
      <ProjectDetailModals project={projectSummary} />
    </ProjectDetailProviders>
  );
}
