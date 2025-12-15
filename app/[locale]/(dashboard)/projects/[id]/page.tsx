import { ProjectDetailPage } from "./ProjectDetailPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectDetailFullServerContainer } from "@/components/projects/ProjectDetailFullServerContainer";
import { ProjectDetailFormServerContainer } from "@/components/projects/ProjectDetailFormServerContainer";
import { ProjectDetailCardHeadingServerContainer } from "@/components/projects/ProjectDetailCardHeadingServerContainer";

export default async function AppProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();

  const { id } = await params;

  return (
    <ProjectDetailPage
      id={Number(id)}
      ProjectDetailCardHeadingServerContainer={
        ProjectDetailCardHeadingServerContainer
      }
      ProjectDetailContainer={ProjectDetailFullServerContainer}
      ProjectDetailFormContainer={ProjectDetailFormServerContainer}
    />
  );
}
