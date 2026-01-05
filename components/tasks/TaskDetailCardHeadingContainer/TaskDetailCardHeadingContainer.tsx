import { notFound } from "next/navigation";
import { getTaskSummary } from "@/lib/data/task/task.service";
import { DetailCardHeading } from "@/components/common/DetailCard";

export async function TaskDetailCardHeadingContainer({ id }: { id: number }) {
  const task = await getTaskSummary(id);

  if (!task) {
    notFound();
  }

  return <DetailCardHeading>{task.title}</DetailCardHeading>;
}
