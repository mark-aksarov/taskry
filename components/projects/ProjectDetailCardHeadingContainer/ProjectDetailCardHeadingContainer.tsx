import { notFound } from "next/navigation";
import { DetailCardHeading } from "@/components/common/DetailCard";
import { getProjectSummary } from "@/lib/data/project/project.service";

export async function ProjectDetailCardHeadingContainer({
  id,
}: {
  id: number;
}) {
  const project = await getProjectSummary(id);

  if (!project) {
    notFound();
  }

  return <DetailCardHeading>{project.title}</DetailCardHeading>;
}
