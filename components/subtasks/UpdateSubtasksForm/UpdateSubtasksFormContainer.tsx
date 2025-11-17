import useSWR from "swr";
import { GetSubtasksType } from "@/lib/queries/subtasks";
import { UpdateSubtasksForm } from "./UpdateSubtasksForm";
import { UpdateSubtasksFormSkeleton } from "./UpdateSubtasksFormSkeleton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function UpdateSubtasksFormContainer({ taskId }: { taskId: number }) {
  const {
    data: subtasks,
    error,
    isLoading,
  } = useSWR<GetSubtasksType>(`/api/tasks/${taskId}/subtasks`, fetcher);

  if (isLoading) {
    return <UpdateSubtasksFormSkeleton />;
  }

  if (!subtasks) return null;

  return (
    <UpdateSubtasksForm
      initialSubtasks={subtasks.map((s) => ({
        id: s.id,
        text: s.text,
        isDone: s.isDone,
      }))}
    />
  );
}
