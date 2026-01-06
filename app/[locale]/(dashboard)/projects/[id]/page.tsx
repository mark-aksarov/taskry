import { ProjectDetailPage } from "./ProjectDetailPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectDetailFormContainer } from "@/components/projects/ProjectDetailFormContainer";
import { ProjectDetailFullContainer } from "@/components/projects/ProjectDetailFullContainer";
import { ProjectDetailCardHeadingContainer } from "@/components/projects/ProjectDetailCardHeadingContainer";
import { Suspense } from "react";
import { DetailCardHeadingSkeleton } from "@/components/common/DetailCard";
import { ProjectDetailFullSkeleton } from "@/components/projects/ProjectDetailFull";
import { ProjectDetailFormSkeleton } from "@/components/projects/ProjectDetailForm";

export default async function AppProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();

  const { id: strId } = await params;
  const id = Number(strId);

  return (
    <ProjectDetailPage
      projectDetailCardHeadingContainer={
        <Suspense fallback={<DetailCardHeadingSkeleton />}>
          <ProjectDetailCardHeadingContainer id={id} />
        </Suspense>
      }
      projectDetailContainer={
        <Suspense fallback={<ProjectDetailFullSkeleton />}>
          <ProjectDetailFullContainer id={id} />
        </Suspense>
      }
      projectDetailFormContainer={
        <Suspense fallback={<ProjectDetailFormSkeleton />}>
          <ProjectDetailFormContainer />
        </Suspense>
      }
    />
  );
}
