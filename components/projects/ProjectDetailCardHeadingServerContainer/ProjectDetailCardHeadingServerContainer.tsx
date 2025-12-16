import { DetailCardHeading } from "@/components/common/DetailCard";
import { getProjectSummary } from "@/lib/data/project";

export async function ProjectDetailCardHeadingServerContainer({
  id,
}: {
  id: number;
}) {
  const project = await getProjectSummary(id);

  return <DetailCardHeading>{project.title}</DetailCardHeading>;
}
