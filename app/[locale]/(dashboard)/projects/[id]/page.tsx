import { ProjectDetailPage } from "./ProjectDetailPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectDetailAltContainer } from "@/components/projects/ProjectDetailAltContainer";
import { ProjectDetailHeaderContainer } from "@/components/projects/ProjectDetailHeaderContainer";

export default async function AppProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();

  const { id } = await params;

  return (
    <ProjectDetailPage
      projectDetailContainer={
        <ProjectDetailAltContainer projectId={Number(id)} />
      }
      projectHeaderContainer={
        <ProjectDetailHeaderContainer projectId={Number(id)} />
      }
    />
  );
}
