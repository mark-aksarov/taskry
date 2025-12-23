import { getTaskSummary } from "@/lib/data/task/task.dal";
import { DetailCardHeading } from "@/components/common/DetailCard";

export async function TaskDetailCardHeadingServerContainer({
  id,
}: {
  id: number;
}) {
  const task = await getTaskSummary(id);
  return <DetailCardHeading>{task.title}</DetailCardHeading>;
}
