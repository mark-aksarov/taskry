import { ProjectDetailPage } from "./ProjectDetailPage";
import { ProjectDetailFullServerContainer } from "@/components/projects/ProjectDetailFullServerContainer";
import { ProjectDetailCardHeadingServerContainer } from "@/components/projects/ProjectDetailCardHeadingServerContainer";
import { ProjectDetailFormServerContainer } from "@/components/projects/ProjectDetailFormServerContainer";

export default async function AppProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
