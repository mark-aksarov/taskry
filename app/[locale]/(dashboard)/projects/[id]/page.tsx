import { ProjectDetailPage } from "./ProjectDetailPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectDetailFormContainer } from "@/components/projects/ProjectDetailFormContainer";
import { ProjectDetailFullContainer } from "@/components/projects/ProjectDetailFullContainer";
import { ProjectDetailCardHeadingContainer } from "@/components/projects/ProjectDetailCardHeadingContainer";

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
      ProjectDetailCardHeadingContainer={ProjectDetailCardHeadingContainer}
      ProjectDetailContainer={ProjectDetailFullContainer}
      ProjectDetailFormContainer={ProjectDetailFormContainer}
    />
  );
}
