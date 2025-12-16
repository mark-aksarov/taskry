import { DetailCardHeading } from "@/components/common/DetailCard";
import { getTaskSummary } from "@/lib/data/task";

export async function TaskDetailCardHeadingServerContainer({
  id,
}: {
  id: number;
}) {
  const task = await getTaskSummary(id);

  return <DetailCardHeading>{task.title}</DetailCardHeading>;
}
